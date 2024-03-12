import GroupList from "../groupList/GroupList";
import ErrorCheck from "../errorCheck/ErrorCheck";

function App() {
  return (
    <div className="app">
      Hello World!!!
      <ErrorCheck>
        <GroupList/>
      </ErrorCheck>
      
    </div>
  );
}

export default App;
