(function () {
    const params = (new URL(document.location)).searchParams;
    let p = JSON.parse(params.get('p'));
    let layout = JSON.parse(params.get('layout'));
    window.Plotly.newPlot('chart', [...p], layout);
}(window));
