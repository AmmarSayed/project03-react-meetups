import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";
const newMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredData) => {
    const res = await fetch(`/api/new-meetup`, {
      method: "POST",
      body: JSON.stringify({ ...enteredData }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create a mazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};

export default newMeetup;
