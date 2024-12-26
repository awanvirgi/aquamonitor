import Link from "next/link"

const Login = () => {
    return (
        <div className="h-screen flex justify-center items-center bg-main">
            <div className="bg-white rounded-lg flex flex-col px-10 py-12 max-w-[320px]">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold">Login</h1>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-lg font-semibold">
                        <h3>Username</h3>
                        <input type="text" name="name" id="name" className="border-b-2 py-2 px-3 outline-none text-base font-normal" placeholder="Masukan Username" />
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-lg font-semibold">
                        <h3>Password</h3>
                        <input type="password" name="password" id="password" className="border-b-2 py-2 px-3 outline-none text-base font-normal" placeholder="Masukan Password" />
                    </label>
                </div>
                <div className="flex justify-center w-full">
                    <Link href={"/dashboard"}>
                        <button className="bg-main text-white font-semibold py-2 px-8 rounded-lg">
                            Submit
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
export default Login