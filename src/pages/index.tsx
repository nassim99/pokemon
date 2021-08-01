import React from 'react';

import Modal from 'components/modal';
import PokemonCardSkeleton from 'components/pokemon-card/skeleton';
import PokemonCard from 'components/pokemon-card';
import { PokemonDataProps } from 'types/pokemon-data';
import { apiEndPoint } from 'api/config';

// get window dimensions
const { innerWidth: width, innerHeight: height } = window;
// set maximum width
const maxWidth = width > 900 ? 900 : width;
// calculate how many pokemon cards can fit the window
const numberPokemonsToLoad = ~~((maxWidth * height * 1.5) / (200 * 350));
// create undefined arrays to fill the window
let emptyArray = [...Array(numberPokemonsToLoad)];

const maxPokes = 1118;

const Index: React.FC = () => {
  // create ref
  const loader = React.useRef<HTMLDivElement>(null);

  // pokemons list
  const [pocks, setPoks] = React.useState<Array<PokemonDataProps | undefined | any>>(emptyArray);

  const [selectedPokemon, setSelectedPokemon] = React.useState<number | null>(null);

  // link to fetch pokemons
  const [link, setLink] = React.useState<string>(
    `${apiEndPoint}/pokemon?limit=${numberPokemonsToLoad}`,
  );

  // the observed element is in the view area
  // add new undefined array element to the state
  const handleObserver = React.useCallback(
    entries => {
      const target = entries[0];
      if (
        pocks.length < maxPokes &&
        pocks[pocks.length - 1] != undefined &&
        target.isIntersecting &&
        link != null
      ) {
        if (pocks.length + numberPokemonsToLoad > maxPokes) {
          emptyArray = [...Array(maxPokes - pocks.length)];
        }

        const extactedpokes = [...pocks, ...emptyArray];
        setPoks(extactedpokes);
      }
    },
    [link, pocks],
  );

  // create obsever to watch if an element in the view area
  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleObserver, link]);

  // once the length of pokemon changes
  // load pokemons fom api
  React.useEffect(() => {
    if (pocks.length > 1 && pocks[pocks.length - 1] === undefined) {
      getPokemons();
    }
    // eslint-disable-next-line
  }, [pocks.length]);

  const getPokemons = () => {
    let extractedPokes = [...pocks];
    // load pokemons list
    fetch(link)
      .then(response => response.json())
      .then(async response2 => {
        let i = 0;
        // loop the result and fetch each pokemon details
        for (let index = pocks.length - numberPokemonsToLoad; index < pocks.length; index++) {
          await fetch(response2.results[i].url)
            .then(response3 => response3.json())
            .then(async response4 => {
              extractedPokes[index] = { ...response4 };

              extractedPokes[index].species = await fetch(extractedPokes[index].species.url)
                .then(response5 => response5.json())
                .then(response6 => response6);
              setPoks([...extractedPokes]);
            });

          i++;
        }

        // set the next page as a link to fetch next time
        setLink(response2.next);
      });
  };

  const handlePokemonPress = (i: number) => {
    document.documentElement.style.overflow = 'hidden';
    setSelectedPokemon(i);
  };
  const handleClose = () => {
    document.documentElement.style.overflow = 'scroll';
    setSelectedPokemon(null);
  };
  return (
    <React.Fragment>
      <div className="pokemonsWrapper">
        {pocks.map((item, i) => (
          <div data-testid="pokemonsChilds" key={i}>
            {item === undefined ? (
              <PokemonCardSkeleton />
            ) : (
              <PokemonCard onPress={() => handlePokemonPress(i)} item={item} />
            )}
          </div>
        ))}
      </div>
      <div ref={loader} className="loaderElement" />
      {selectedPokemon != null && (
        <Modal
          pokemon={selectedPokemon != null ? pocks[selectedPokemon] : undefined}
          onClose={handleClose}
        />
      )}
    </React.Fragment>
  );
};

export default Index;
