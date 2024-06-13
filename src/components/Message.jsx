import { useSelector } from "react-redux"

const Message = () => {
   const message = useSelector((state) => state.message)

   if (message !== "") {
    return (
        <div className="message">
          {message}
        </div>
    )
   }
}

export default Message