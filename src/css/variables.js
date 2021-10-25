export const smallBreakPoint = "640px";
export const mediumBreakPoint = "768px";
export const largeBreakPoint = "1064px";


export const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
    let yOffset = 126
    if (window.innerWidth <= 640) yOffset = 90

    window.scrollTo({ top: yCoordinate - yOffset, behavior: 'smooth' })
}