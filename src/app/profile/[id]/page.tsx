import Head from "next/head";

interface UserProfileProps {
  params: {
    id: string;
  };
}

const UserProfile = ({ params }: UserProfileProps) => {
  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            User Profile
          </h2>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Username:</p>
            <p className="text-gray-800">{params.id}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Email:</p>
            <p className="text-gray-800">user@example.com</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Joined:</p>
            <p className="text-gray-800">2022-01-01</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;