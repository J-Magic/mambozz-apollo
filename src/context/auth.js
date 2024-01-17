import { createContext, useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userSession, setUserSession] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const getAuthenticateUser = async () => {
      const { username, signInDetails } = await getCurrentUser();
      setUser(username);
      const { tokens: session } = await fetchAuthSession({
        forceRefresh: true,
      });
      setUserSession(session);
      setToken(session?.accessToken?.toString());
      // const { accessToken } = tokens;
      console.log('TOKEN: ', session);
      console.log('ACCESS TOKEN: ', session?.accessToken?.toString());
      console.log('USER: ', username);
      console.log('SIGNINDETAILS:', signInDetails);
      return {
        username,
        session,
        authenticationFlowType: signInDetails?.authFlowType,
      };
    };

    getAuthenticateUser();

    // console.log(AuthUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userSession, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('User not logged in.');
  }
  return authContext;
};

// export default AuthContextProvider;
