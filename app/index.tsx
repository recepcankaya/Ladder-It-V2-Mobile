import { Redirect } from "expo-router";

const Index = () => {
    return (
        <Redirect href={"/(auth)/loading"} />
    )
}

export default Index;