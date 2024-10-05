import Image from "next/image"
import { LoginForm } from "@/components"

const LoginPage = () => {
  return (
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
      <div className="md:flex w-full">
        <div className="hidden md:flex w-1/2 bg-indigo-500 py-10 px-10 md:justify-center md:items-center">
          <Image alt="inicio de sesión" src="https://cdni.iconscout.com/illustration/premium/thumb/searching-file-illustration-download-in-svg-png-gif-formats--data-finding-something-business-pack-people-illustrations-3414904.png?f=webp" width={500} height={500} />
        </div>
        <LoginForm />
      </div>
    </div>

  )
}

export default LoginPage