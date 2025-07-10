import * as React from "react";
import { Message, useToaster, ButtonToolbar, SelectPicker, Button } from 'rsuite';
import { useAppSelector } from "../../hooks/redux-hooks";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useEffect } from "react";



const NotificationBar = () => {
  const dispatch = useAppDispatch();
  const { open, content, typer } = useAppSelector((state) => state.notification);
  const [placement, setPlacement] = React.useState('topEnd');
  const toaster = useToaster();

  const message = (
    <Message showIcon type={typer} closable>
      <strong>{typer}!</strong> {content}.
    </Message>
  );

  useEffect(() => {
    toaster.push(message, { duration: 5000 , placement: 'topEnd'});
  }, [message]);

    


  return null;
};

export default NotificationBar;