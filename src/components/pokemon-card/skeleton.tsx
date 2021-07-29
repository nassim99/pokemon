import './style.css';

const PokemonCardSkeleton: React.FC = () => {
  return (
    <div className="pokemonCard">
      <div className="load-wraper">
        <div className="activity" />
      </div>
      <div className="bottomCardWrapper">
        <div className="bottomCardText1">
          <div className="activity" />
        </div>
        <div className="bottomCardText1 height20Width40">
          <div className="activity" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCardSkeleton;
