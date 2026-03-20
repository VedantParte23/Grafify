
const ctx = document.getElementById("Maza_Chart").getContext('2d')

const xValues = [];
const yValues = [];
const barColors = [];
let Chart_type = "bar"
let Maza_Chart = new Chart(ctx,{
    type: `${Chart_type}`,
    data:{
        labels: xValues,
        datasets: [{
            label: "",
            backgroundColor: barColors,
            borderColor: barColors,
            data: yValues
        }]
    },
    options: {
        //directly change kelay background white honyasathi
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
            legend: {display: true},
            beforeDraw:{
                id: 'pandhraBackground',
                beforeDraw(chart,args,options){
                    const ctx = chart.ctx
                    ctx.save()
                    ctx.fillStyle = 'white'
                    ctx.fillRect(0,0, chart.width, chart.height)
                    ctx.restore()
                }
            }
        }
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
    let data_values = document.getElementById("num_input").value.trim()
    let selected_type = document.getElementById("type_chart").value

    if(!label || !data_values){
        alert("Enter valid data")
        return
    }

    let value = Number(data_values)
    if (isNaN(value)){
        alert("Enter a number")
        return
    }


    if (selected_type && selected_type != Maza_Chart.config.type) {

        Maza_Chart.config.type = selected_type
}

    


    Maza_Chart.data.labels.push(label);
    Maza_Chart.data.datasets[0].data.push(value)
    Maza_Chart.data.datasets[0].backgroundColor.push(Random_Rang_Tayar_karnara())

    Maza_Chart.update()

    document.getElementById("text_input").value = ""
    document.getElementById("num_input").value = ""
    
}

function control_CSV(){                                                                                                                                             
    const data_input =  document.getElementById("csv_file")
    const file = data_input.files[0]

    if(!file){
        console.error("Please select a file ");
        return
    }

     Papa.parse(file, {
        header: false, 
        skipEmptyLines: true,
        complete: function(results) {
            const rows = results.data;
            
        
            Maza_Chart.data.labels = [];
            Maza_Chart.data.datasets[0].data = [];
            Maza_Chart.data.datasets[0].backgroundColor = []

            rows.forEach(row => {
                if (row[0] && row[1]) {
                    let value = parseFloat(row[1]);
                    if(isNaN(value)) return;


                    Maza_Chart.data.labels.push(row[0]); 
                    Maza_Chart.data.datasets[0].data.push(value);
                    Maza_Chart.data.datasets[0].backgroundColor.push(Random_Rang_Tayar_karnara())
                }
            }
        );

            Maza_Chart.update();
        }
    });
}



function download_da_pdf(){
    const {jsPDF} = window.jspdf;
    let photoData = Maza_Chart.toBase64Image()
    const pdf = new jsPDF('landscape')
    pdf.setFontSize(20)
    pdf.text("Grafify",10,15)
    pdf.addImage(photoData,'PNG', 15,30,250,120)
    pdf.save("Grafify_chart.pdf")

}

function clean_graph(){

    Maza_Chart.data.labels = []
    Maza_Chart.data.datasets[0].data = []
    Maza_Chart.data.datasets[0].backgroundColor = []
    Maza_Chart.update()

}                                                                                                                        

function change_chart_type(){
    let selected_type = document.getElementById("type_chart").value
    if(selected_type && selected_type !== Maza_Chart.config.type){
        Maza_Chart.config.type = selected_type
        Maza_Chart.update()
    }
}

function Change_rang_to_takta(theme){

    let colors = []

    if(theme == "rainbow"){
        colors = ['violet', 'indigo', 'blue', 'green', 'yellow','orange', 'red']
    }

    if(theme == 'blue_theme'){
        colors = [
    '#001f3f', '#003366', '#004080', '#0059b3',
    '#0073e6', '#3399ff', '#66b3ff', '#99ccff',
    '#cce6ff', '#e6f2ff'
];
    }
    if(theme === 'warm'){
        colors = [
    '#ff4e50', '#ff6f61', '#ff8a65', '#ffab91',
    '#ffc107', '#ffd54f', '#ffb74d', '#ff9800',
    '#fb8c00', '#f57c00', '#ef6c00'
];
    }

    if (theme == 'random') {
        colors = Maza_Chart.data.datasets[0].data.map(() => Random_Rang_Tayar_karnara())
    }

    Maza_Chart.data.datasets[0].backgroundColor = Maza_Chart.data.datasets[0].data.map((_,i)=>colors[i % colors.length])
    Maza_Chart.data.datasets[0].borderColor = Maza_Chart.data.datasets[0].backgroundColor

    Maza_Chart.update()

}

const dark_btn = document.getElementById("dark_mode_change_btn");
dark_btn.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme')

    if(document.body.classList.contains('dark-theme')){
        dark_btn.textContent  ="Light_Mode"
    }
    else{
        dark_btn.textContent = "Dark_Mode"
    }
})

