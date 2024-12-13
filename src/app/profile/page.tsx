import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          General Profile Page
          </h2>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;