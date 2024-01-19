export const requestTemplate = `query AllPokemons($first: Int!) {
  pokemons(first: $first) {
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        damage
      }
    }
  }
}
`;
