type Pytanie = {
    tresc: string,
    odpowiedz: string,
    zdjecie?: string,
}
fetch("https://inf04.nigdit.men/api/questions").then((res) => res.json()).then( async (data: Pytanie[]) => {
    const clickButtons = await browser.storage.sync.get('clickButtons').then((res) => res.clickButtons);
    const newButton = document.querySelector('#losujnowe');
    if(!newButton) throw new Error('Brak przycisku');
    setTimeout(() => nowePytanie(data, clickButtons || false), 1000)
}).catch((err) => console.error(err));

const nowePytanie = async (odpowiedzi: Pytanie[], clickButtons = false) => {
    if(!(!!odpowiedzi)) throw new Error('[ROZSZERZENIE]: Brak odpowiedzi')
    const obecnePytania = document.querySelector('.tresc')
    const odpowiedzA = document.querySelector('#odpa')
    const odpowiedzB = document.querySelector('#odpb')
    const odpowiedzC = document.querySelector('#odpc')
    const odpowiedzD = document.querySelector('#odpd')
    if(!obecnePytania || !odpowiedzA || !odpowiedzB || !odpowiedzC || !odpowiedzD) throw new Error('[ROZSZERZENIE]: Brak pytania lub odpowiedzi');
    const obecnePytanie = obecnePytania.textContent;
    if(!obecnePytanie) throw new Error('[ROZSZERZENIE]: Brak pytania');
    const wszystkieOdp = [odpowiedzA, odpowiedzB, odpowiedzC, odpowiedzD];
    let odpowiedz = odpowiedzi.find((pytanie) => pytanie.tresc.toLowerCase().includes(obecnePytanie.toLowerCase()));
    if(!odpowiedz && !document.querySelector('.odpgood')) {
        console.warn('[ROZSZERZENIE]: Nie znaleziono odpowiedzi na pytanie: ' + obecnePytanie);
        const looseSearch = odpowiedzi.find((pytanie) => pytanie.tresc.substring(0, 10) === obecnePytanie.substring(0, 10));
        console.log('[ROZSZERZENIE]: Szukanie w miarę dopasowanej odpowiedzi: ' + looseSearch?.tresc);
        
        if(!looseSearch?.odpowiedz) {
            return setTimeout(nowePytanie, 1000, odpowiedzi, clickButtons);
        }
        odpowiedz = looseSearch;
    }
    for(const ans of wszystkieOdp) {
        if(ans.textContent && ans.textContent.toLowerCase().slice(3) == odpowiedz?.odpowiedz.toLowerCase() && ans.className != 'odpgood') {
            const htmlAns = ans as HTMLElement;
            if(clickButtons) {
                htmlAns.click();
            }else {
                htmlAns.style.backgroundColor = 'green';
                htmlAns.textContent += ' (kliknij w to)'
            }
        }
    }
    setTimeout(nowePytanie, 1000, odpowiedzi, clickButtons);
}