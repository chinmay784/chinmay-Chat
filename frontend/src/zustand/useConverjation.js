import { create } from "zustand"

const useConverjation = create((set) =>({
  selectedConversation : null,
  setselectedConversation:(selectedConversation) => set({selectedConversation}),
  messages:[],
  setMessages:(messages) =>set({messages}),
}))


export default useConverjation