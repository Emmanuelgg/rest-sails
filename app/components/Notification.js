import React, {Component} from "react"
import { store } from 'react-notifications-component';
  
const showNotification = (title, message, type = "success", duration = 5000) => {
    store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "bottom-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: duration,
          onScreen: true
        }
      });
}

export default showNotification
  