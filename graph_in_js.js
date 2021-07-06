
function createGraph(V,E)
{
   var adj_list = [];

   for(let i=0;i<V;i++)
   	adj_list.push([]);

   for(let i=0;i<E.length;i++)
   {
   		adj_list[E[i][0]-1].push([E[i][1]-1,E[i][2]]);
   		adj_list[E[i][1]-1].push([E[i][0]-1,E[i][2]]);
   }

   return adj_list;
}



function Dijikstra(V,graph,src)
{
        let vis = [];

        for(let i=0;i<V;i++)
            vis.push(0);

        let dis = [];

        for(let i=0;i<V;i++)
            dis.push([1000,-1]);

        dis[src][0] = 0;
        vis[src] = 1;

        for(let i=0;i<graph[src].length;i++)
        {
                let edge = graph[src][i];

                if(vis[edge[0]] == 0 && dis[edge[0]][0] > dis[src][0] + edge[1])
                {
                    dis[edge[0]][0] =  dis[src][0] + edge[1];
                    dis[edge[0]][1] = src;
                }
        }

        for(let i=0;i<V-1;i++)
        {
                let min = -1;

                for(let j=0;j<V;j++)
                {
                        if(vis[j] == 0)
                        {
                                if(min==-1 || dis[j][0] < dis[min][0])
                                {
                                    min = j;
                                }
                        }
                }

                vis[min] = 1;

                for(let j=0;j<graph[min].length;j++)
                {
                      let edge = graph[min][j];

                      if(vis[edge[0]]==0 && dis[edge[0]][0] > dis[min][0] + edge[1])
                      {
                            dis[edge[0]][0] =  dis[min][0] + edge[1];
                            dis[edge[0]][1] = min;
                      }

                }
        }

        return dis;


 }

function solve(src,des,vertices,edges,plane)
{
    let v_cnt = vertices.length;
    let Edges = [];

    for(i=0;i<edges.lenght;i++)
    {
        Edges.push([edges.from,edges.to,parseInt(edges.label)]);       
    }

    let graph = createGraph(v_cnt,Edges);

    let src = Math.floor(Math.random()*9),des = Math.floor(Math.random()*9);

    while(des!=src)
       des = Math.floor(Math.random()*9);

   let dis_src = Dijikstra(v_cnt,graph,src);
   let dis_des = Dijikstra(v_cnt,graph,des);

   let plane = 0,par1 = -1,p1 = -1,par2 = -1,p2 = -1;

   let plane_edges = [];

   for(let i = 0;i < plane.length; i++)
   {
            plane_edges.push([plane[i].from,plane[i].to,parseInt(plane[i].label)]);
   }




}


/*var v = 3;
var E = [[1,2,3],[2,3,2]];
const Graph = createGraph(v,E);

console.log(Graph);

const dis = Dijikstra(v,Graph,0);

console.log(dis);*/

/*
onload = function () {

    // create a network
    const container = document.getElementById('container');
    const genNew = document.getElementById('generate-graph');

    // initialise graph options
    const options = {
        edges: {
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf015',
                size: 40,
                color: '#991133',
            }
        }
    };

    // initialize your network!
    const network = new vis.Network(container);
    network.setOptions(options);

    function createData(){
        const cities = ['Delhi', 'Mumbai', 'Gujarat', 'Goa', 'Kanpur', 'Jammu', 'Hyderabad', 'Bangalore', 'Gangtok', 'Meghalaya'];

        // Initialising number of nodes in graph dynamically
        const V = Math.floor(Math.random() * cities.length) + 3;

        // Preparing node data for Vis.js
        let vertices = [];
        for(let i=0;i<V;i++){
            vertices.push({id:i, label: cities[i-1]});
        }

        // Preparing edges for Vis.js
        let edges = [];
        for(let i=1;i<V;i++){
            // Picking a neighbour from 0 to i-1 to make edge to
            let neigh = Math.floor(Math.random()*i);

            // Adding the edge between node and neighbour
            edges.push({from: i, to: neigh, color: 'orange',label: String(Math.floor(Math.random()*70)+30)});
        }

        //Preparing data object for Vis.js
        const data = {
            nodes: vertices,
            edges: edges
        };
        return data;
    }

    genNew.onclick = function () {
        // Creating and setting data to network
        let data = createData();
        network.setData(data);
    };

    genNew.click();
};*/