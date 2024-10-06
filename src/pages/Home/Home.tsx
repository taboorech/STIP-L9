import Model from "../../components/Model/Model";
import staticModelImage from '../../assets/StaticModel.drawio.png';
import dynamicModelImage from '../../assets/DynamicModel.drawio.png';
import Table from "../../components/Table/Table";

const Home = () => {
  return (
    <div>
      <Model header="Статична модель" image={staticModelImage} />
      <Model header="Динамічна модель" image={dynamicModelImage} />
      <Table />
    </div>
  );
};

export default Home;