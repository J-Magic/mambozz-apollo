import React from 'react';

export default function formerChatPage() {
  return (
    <div className='container'>
      <div className='leftside'>
        {/* Header */}
        <div className='header'>
          <div className='userimg'>
            <img src={valley} className='cover' />
          </div>
          <ul className='nav-icons'>
            <li>
              <IoScanCircleOutline />
            </li>
            <li>
              <IoChatbox />
            </li>
            <li>
              <IoEllipsisVertical />
            </li>
          </ul>
        </div>
        {/* Search */}
        <div className='search_chat'>
          <div>
            <input type='text' placeholder='Search chats' />
            <div className='ion-icon'>
              <IoSearch />
            </div>
          </div>
        </div>
        {/* Chatlist */}
        <div className='chatlist'>
          {/* 1st chat */}
          <div className='block'>
            <div className='imgbox'>
              <img src={valley} className='cover' />
            </div>
            <div className='details'>
              <div className='listHead'>
                <h5>Joshua Milanya</h5>
                <p className='time'> 10:35</p>
              </div>
              <div className='message_p'>
                <p> One line msg from chat</p>
              </div>
            </div>
          </div>
          {/* 2nd Chat */}
          <div className='block active'>
            <div className='imgbox'>
              <img src={valley} className='cover' />
            </div>
            <div className='details'>
              <div className='listHead'>
                <h5>Kimmy</h5>
                <p className='time'> 10:35</p>
              </div>
              <div className='message_p'>
                <p> One line msg from chat</p>
              </div>
            </div>
          </div>
          {/* 3rd Chat */}
          <div className='block unread'>
            <div className='imgbox'>
              <img src={valley} className='cover' />
            </div>
            <div className='details'>
              <div className='listHead'>
                <h5>Kimberly Milanya</h5>
                <p className='time'> 10:35</p>
              </div>
              <div className='message_p'>
                <p> One line msg from chat</p>
                <b>1</b>
              </div>
            </div>
          </div>
          {/* 4th chat */}
          <div className='block unread'>
            <div className='imgbox'>
              <img src={valley} className='cover' />
            </div>
            <div className='details'>
              <div className='listHead'>
                <h5>Braya</h5>
                <p className='time'> 10:35</p>
              </div>
              <div className='message_p'>
                <p> One line msg from chat</p>
                <b>1</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='rightside'>
        <div className='header'>
          <div className='imgText'>
            <div className='userimg'>
              <img src={valley} className='cover' />
            </div>
            <h5>
              Kimmy <br />
              <span>Online</span>
            </h5>
          </div>
          <ul className='nav-icons'>
            <li>
              <IoSearchOutline />
            </li>
            <li>
              <IoEllipsisVertical />
            </li>
          </ul>
        </div>

        {/* Chatbox */}
        <div className='chatbox'>
          <div className='message my_message'>
            <p>
              Hi <br /> <span>12:15</span>
            </p>
          </div>

          <div className='message frnd_message'>
            <p>
              Hello afihkda;l gmad;fm;algm <br /> <span>12:15</span>
            </p>
          </div>
          <div className='message my_message'>
            <p>
              ajfha;hgfl;aknlg;annganknkgl;ad <br /> <span>12:15</span>
            </p>
          </div>
          <div className='message frnd_message'>
            <p>
              Hello oajgojagd;ajda <br /> <span>12:15</span>
            </p>
          </div>

          <div className='message frnd_message'>
            <p>
              Hello amlkmgad;lmgal;'mga;mv,mgpa'smv l alksgnmb l <br />{' '}
              <span>12:15</span>
            </p>
          </div>

          {/* chat input */}
          <div className='chatbox_input'>
            <IoHappyOutline className='icon' />
            <IoAttachOutline className='icon' />
            <input type='text' placeholder='type a message' />
            <IoMic className='icon' />
          </div>
        </div>
      </div>
    </div>
  );
}
