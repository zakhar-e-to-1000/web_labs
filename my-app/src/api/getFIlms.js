
function randomLorem() {
    const lorem = "Curabitur ac magna ut enim elementum mattis. Integer sit amet metus nec urna lacinia rhoncus sed quis odio. Cras nisi dui, vulputate tincidunt convallis at, aliquet non turpis. Donec tincidunt velit eu nisi interdum, eget pharetra erat tempor. Vivamus lobortis nunc non nibh congue, non iaculis erat dapibus. Aenean mattis, lorem nec dictum aliquam, urna quam tempus metus, nec efficitur tortor tortor ut felis. Cras eu tristique diam, semper convallis libero. Vivamus id ante lectus. Morbi pulvinar eros hendrerit sapien dignissim facilisis. Praesent vitae justo ac arcu consequat volutpat nec sit amet magna. Phasellus dignissim egestas augue quis lobortis. Mauris in viverra sem. Vestibulum eu suscipit neque. Duis non est lorem. Duis mattis tortor sit amet volutpat vehicula. Duis dolor massa, auctor non molestie ac, convallis quis risus. "
    let rand = Math.floor(Math.random() / 2 * lorem.length)
    return lorem.slice(rand)
}

export default function getFilms(count) {
    const films = []
    for (let num = 1; num < count + 1; num++) {
        films.push({
            title: `Film ${num}`,
            id: num,
            duration: 2 * num,
            reviews: 3 * num,
            description: randomLorem()
        })
    }
    return films
}