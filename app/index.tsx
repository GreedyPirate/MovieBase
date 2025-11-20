import { Redirect } from "expo-router";
import { observer } from 'mobx-react-lite';

const Index =  observer(() => {
  return (
    <Redirect href="/login" />
  );
}) 
export default Index
