(function () {
    const params = (new URL(document.location)).searchParams;
    let plots = JSON.parse(params.get('plots'));
    let layout = JSON.parse(params.get('layout'));
    window.Plotly.newPlot('chart', [...plots], layout);
}(window));
