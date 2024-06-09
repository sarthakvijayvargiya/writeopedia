import authService from "./appwrite/auth";
function App() {
  authService.createAccount("hello","any","okay");
  
  return <></>;
}

export default App;
