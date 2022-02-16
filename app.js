const main = document.querySelector('main');
const select = document.querySelector('select');
const search = document.querySelector('form input');
const fetchingData = async () =>{
    const request = await fetch('https://api.tvmaze.com/shows/48450/episodes');
    const data =  await request.json();
    return data;
};
// const makeCard2 = (id)
const makeCard = (episode) =>{
    const card = document.createElement('section');
    const a = document.createElement('a');
    const img = document.createElement('img');
    // card.classList.add('display');
    card.setAttribute('id',episode.id);
    img.setAttribute('src',episode.image.medium);
    a.setAttribute('href',episode.url);
    a.appendChild(img);
    card.appendChild(a);
    card.innerHTML+=`<h5>${episode.name} , S0${episode.season}E0${episode.number}</h5>
    <div>${episode.summary}</div>`;
    main.appendChild(card);
};
const makeOptionList = (episode) =>{
    const option = document.createElement('option');
    option.setAttribute('value',episode.id);
    option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    select.appendChild(option);
};
const filterMovies = (term) => {
    Array.from(main.children)
    .filter((episode) => !episode.querySelector('h5').textContent.toLowerCase().includes(term))
    .forEach((episode) => episode.classList.add('filtered'));
    Array.from(main.children)
    .filter((episode) => episode.querySelector('h5').textContent.toLowerCase().includes(term))
    .forEach((episode) => episode.classList.remove('filtered'));
}
search.addEventListener('keyup', e => {
    const term = search.value.trim().toLowerCase();
    filterMovies(term);
});
select.addEventListener('change',(e)=>{
    const id = e.target.value;
    if(id !== 'all'){
        Array.from(main.children)
        .forEach(e =>{
            if(id !== e.id){
                e.classList.add('filtered')
            }else{
                e.classList.remove('filtered')
            }
        })
    }else{
        Array.from(main.children)
        .forEach(e => e.classList.remove('filtered'));
    }
});

fetchingData()
.then(episodes =>{
    console.log(episodes);
    episodes.forEach(episode => {
        makeCard(episode);
        makeOptionList(episode);
        // serchId(eoisode);
    });

}).catch(err =>{
    console.log(err);
})