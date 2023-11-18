import ImageLevel from "../assets/img/level.jpeg";
const Level1 = () => {
  return (
    <div className="map map--1">
      <title>Miller Floorplan Ground Level</title>
      <img className="image" draggable={false} src={ImageLevel} alt="" />
    </div>
  );
};

export default Level1;
