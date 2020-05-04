const search = document.querySelector('#search'),
    matchList = document.getElementById('match-list');

const searchState = async searchText => {
    const res = await fetch('../data/states.json');
    const states = await res.json();

    //get matched states
    let matches = states.filter(state => {
        const regEx = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regEx) || state.abbr.match(regEx);
    });
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }

    outputHtml(matches);
};
// show output 
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
    <div class="card card-body mb-1">
      <h4>${match.name} (${match.abbr})
      <span class="text-primary">${match.capital}</span></h4>
      <small>Lat: ${match.lat} / Long: ${match.long}</small>
    </div>`).join('');

        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchState(search.value));