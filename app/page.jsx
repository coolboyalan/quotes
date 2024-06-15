import TabSelector from "@/components/TabSelector";

export const metadata = {
  title: 'Darkastic',
  description:'New Quotes Everyday'
}

const Home = () => {
  return (
    <section className="bg-white h-screen px-4 text-black">
      <TabSelector />
    </section>
  );
};

export default Home;
