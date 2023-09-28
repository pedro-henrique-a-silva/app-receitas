import React, { useEffect } from 'react';
import style from './Message.module.css';

type MessageProps = {
  toggleIsVisible: () => void;
};

function Message(props: MessageProps) {
  const { toggleIsVisible } = props;

  useEffect(() => {
    const displayDuration = 3000;

    const timeoutId = setTimeout(() => {
      toggleIsVisible();
    }, displayDuration);

    return () => clearTimeout(timeoutId);
  }, [toggleIsVisible]);

  return (
    <div className={ style.messageLinkCopied }>
      <p>Link copied!</p>
    </div>
  );
}

export default Message;
