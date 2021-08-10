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
// ~~ is faster substitute for Math.floor() ex:  ~~(14.69) => 14
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

  const [abilities, setAbilities] = React.useState<Array<{ name: string; url: string }>>([]);
  // link to fetch pokemons
  const [link, setLink] = React.useState<string>(
    `${apiEndPoint}/pokemon?limit=${numberPokemonsToLoad}`,
  );

  const [selectedAbility, setSelectedAbility] = React.useState<string | null>(null);

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

  React.useEffect(() => {
    getAbilities();
  }, []);

  const getAbilities = () => {
    fetch('https://pokeapi.co/api/v2/ability/')
      .then(res => {
        return res.json();
      })
      .then(res2 => {
        setAbilities(res2.results);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getPokemons = () => {
    let extractedPokes = [...pocks];
    // load pokemons list
    const filteredPokes = selectedAbility != null ? selectedAbility : link;
    fetch(filteredPokes)
      .then(response => {
        const res = response.json();

        return res;
      })
      .then(async res3 => {
        if (selectedAbility != null) {
          let pokemonsFiltred = { results: new Array(0) };
          for (let index = 0; index < res3.pokemon.length; index++) {
            pokemonsFiltred.results[index] = res3.pokemon[index].pokemon;
          }
          console.log('pokemonsFiltred', pokemonsFiltred);
          return pokemonsFiltred;
        }
        return res3;
      })
      .then(async response2 => {
        let i = 0;
        // loop the result and fetch each pokemon details

        for (
          let index =
            pocks.length - (selectedAbility != null ? pocks.length : numberPokemonsToLoad);
          index < pocks.length;
          index++
        ) {
          await fetch(response2.results[i].url)
            .then(response3 => response3.json())
            .then(async response4 => {
              extractedPokes[index] = { ...response4 };

              extractedPokes[index].species = await fetch(extractedPokes[index].species.url)
                .then(response5 => response5.json())
                .then(response6 => response6)
                .catch(e => {
                  console.log(e);
                  alert('Sorry, Some Error happens');
                });
              setPoks([...extractedPokes]);
            })
            .catch(e => {
              console.log(e);
              alert('Sorry,Some Error happens');
            });

          i++;
        }

        // set the next page as a link to fetch next time
        setLink(response2.next);
      })
      .catch(e => {
        console.log(e);
        alert('Sorry, Some Error happens');
      });
  };

  const handlePokemonPress = (i: number) => {
    // disable scroll if modal is visible
    document.documentElement.style.overflow = 'hidden';
    setSelectedPokemon(i);
  };
  const handleClose = () => {
    // enable scroll if modal is hidden
    document.documentElement.style.overflow = 'scroll';
    setSelectedPokemon(null);
  };

  const handleAbilityChange = (e: any) => {
    setSelectedAbility(e.target.value);
    fetch(e.target.value)
      .then(async res => res.json())
      .then(async res2 => {
        let arr = new Array(res2.pokemon.length).fill(undefined);
        return setPoks(arr);
      });
  };
  return (
    <React.Fragment>
      <select
        disabled={pocks[pocks.length - 1] === undefined}
        onChange={handleAbilityChange}
        value={selectedAbility === null ? 'Select Ability' : selectedAbility}>
        <option value="Select Ability">Select Ability</option>
        {abilities.map((item, i) => (
          <option key={i} value={item.url}>
            {item.name}
          </option>
        ))}
      </select>
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
