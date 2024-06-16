import { useSelector } from "react-redux"

const Message = () => {
   const message = useSelector((state) => state.message)

   /*if (message.text !== "") {
    return (
        <div className="message">
          {message.text}
        </div>
    )
   }*/
   if (message.color === 'green') {
    return (
      <div className="greenmessage">
        {message.text}
      </div>
    )
   }

   if (message.color === 'red') {
    return (
      <div className="redmessage">
        {message.text}
      </div>
    )
   }
}

export default Message