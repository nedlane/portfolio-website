import ContainerBlock from "../components/ContainerBlock";
import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";

export default function Home() {
  return (
    <ContainerBlock title="Ned Lane | Software engineering student" description="Brisbane engineering student working on autonomous vehicle software, networking and developer tools. Seeking ongoing part-time engineering work.">
      <Hero />
      <SelectedWork />
    </ContainerBlock>
  );
}
