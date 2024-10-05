import Image from "next/image";
import { RegisterForm } from "@/components";

const RegisterPage = () => {
  return (
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
      <div className="md:flex w-full">
        <div className="hidden md:flex w-1/2 bg-indigo-500 py-10 px-10 md:justify-center md:items-center">
          <Image alt="tareas" src="https://cdni.iconscout.com/illustration/premium/thumb/faq-illustration-download-in-svg-png-gif-file-formats--call-logo-customer-support-question-mark-loopy-line-pack-business-illustrations-6084519.png?f=webp" width={500} height={500} />
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage;