
const ctx = document.getElementById("myChart").getContext('2d')

const xValues = [];
const yValues = [];
const barColors = [];
let Chart_type = "bar"
const myChart = new Chart(ctx,{
    type: `${Chart_type}`,
    data:{
        labels: xValues,
        datasets: [{
            label: "",
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        responsive: true,
        mainAspectRatio: false
    }
});

function Random_Rang_Tayar_karnara(){
    let symbols = '0123456789ABCDEF';
    let color = '#'
    for (let i = 0; i < 6; i++) { 
       color += symbols[Math.floor(Math.random() * 16)]; 
    }
    return color
}


function take_data(){

    let label = document.getElementById("text_input").value.trim()
    let data_values  = document.getElementById("num_input").value.trim()    
    const Chart_type = document.getElementById("type_chart").value
    let navin_color = Random_Rang_Tayar_karnara()



    if (Chart_type !== "") {
        myChart.config.type = Chart_type;
    }

    xValues.push(label)
    yValues.push(Number(data_values))
    barColors.push(navin_color)

    myChart.update()

    document.getElementById("text_input").value = ""
    document.getElementById("num_input").value = ""
    
}

function control_CSV(){                                                                                                                                             
    //nothing here right now
}

                                                                                                                                
