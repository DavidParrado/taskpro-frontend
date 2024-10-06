import { Projects } from "@/components";
import { cookies } from "next/headers";

const Dashboard = async () => {

  const token = cookies().get("token");
  console.log(token);
  return (
    <Projects />
  );
}

export default Dashboard;