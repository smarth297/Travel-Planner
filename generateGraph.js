

onload = function ()
{  


const container = document.getElementById('mynetwork');
const genrate = document.getElementById('generate-graph');
const ans_container = document.getElementById('mynetwork2');
const ans_genrate = document.getElementById('solve')
const cities = ['Delhi', 'Mumbai', 'Gujarat', 'Goa', 'Kanpur', 'Jammu', 'Hyderabad', 'Bangalore', 'Gangtok', 'Meghalaya'];
src=0,des=9;


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

    network = new vis.Network(container);
    network.setOptions(options);

    ans_network = new vis.Network(ans_container);
    ans_network.setOptions(options);

  
   function create_graph () 
    {

         const edges = [];

         const vertices = [];

         let V = Math.floor(Math.random()*6) + 4;

         for(let i=0;i<V;i++)
            vertices.push({id : i , label : cities[i]});

        for(let i=1;i<V;i++)
        {
                let neigh = Math.floor(Math.random()*(i-1));

                edges.push({type : 0, from : i,to : neigh , color : 'orange' , label : String(Math.floor(Math.random()*70 + 50))});

        }

        var myset1 = new Set();
        var myset2 = new Set();

        for(let i=0;i<edges.length;i++)
        {
             myset1.add(edges[i].from*10 + edges[i].to);

             console.log(edges[i]);
        }

        let extra_edges_bus = Math.floor(Math.random()*5),tries = 0;

        while(extra_edges_bus && tries < 15)
        {
                let node1 = Math.floor(Math.random()*V);
                let node2 = Math.floor(Math.random()*V);

                if(node1+3>=node2 && node1-3<=node2 && node1!=node2 && !myset1.has(node1*10+node2) && !myset1.has(node2*10+node1))
                {
                        myset1.add(node1*10+node2);
                        edges.push({type : 0,from : node1,to : node2,color : 'orange' ,  label : String(Math.floor(Math.random()*70 + 50))});
                        extra_edges_bus--;

                }

                tries++;
        }

        let extra_edges_plane = Math.floor(Math.random()*4);
         tries = 0;

        while(tries < 10 && extra_edges_plane)
        {
                let node1 = Math.floor(Math.random()*V);
                let node2 = Math.floor(Math.random()*V);

                if(node1+3>=node2 && node1-3<=node2 && node1!=node2 && !myset2.has(node1*10+node2) && !myset2.has(node2*10+node1))
                {
                        myset2.add(node1*10+node2);
                        edges.push({type : 1,from : node1,to : node2,color : 'green' ,  label : String(Math.floor(Math.random()*50 + 5))});
                        extra_edges_plane--;

                }

                tries++;
        }

        des = V-1;


        data = {

            nodes : vertices,
            edges : edges,
        };

        return data;
    };


   function createGraph(V,E)
   {
         var adj_list = [];

        for(let i=0;i<V;i++)
            adj_list.push([]);

        for(let i=0;i<E.length;i++)
            {    
                console.log(E[i]);
                
                adj_list[E[i][1]].push([E[i][0],E[i][2]]);
                adj_list[E[i][0]].push([E[i][1],E[i][2]]);
               
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

        for(let i=0;i < V-1;i++)
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

                if(min == -1)
                    break;

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


    function solve()
    {
          let ed = [],V = obtain_data.nodes.length,plane_edges = [];

          
          mymap = new Map();

          console.log(obtain_data);

         
          for(let i=0;i<obtain_data.edges.length;i++)
          {
                let curr_edge = obtain_data.edges[i];

               // console.log(curr_edge['color'],curr_edge);
               
               if(curr_edge['color'] == 'orange')
                ed.push([curr_edge.from,curr_edge.to,parseInt(curr_edge.label)]);
              else
                plane_edges.push([curr_edge.from,curr_edge.to,parseInt(curr_edge.label)]);

             
          }
            

          let graph = createGraph(V,ed);

          let dis_src = Dijikstra(V,graph,src);
          let dis_des =Dijikstra(V,graph,des);

          let plane = 0,p_src = -1,p_des = -1,min_wt = dis_src[des][0];
           final_edges = [];

           
         for(let i = 0;i < plane_edges.length ; i++)
         {
                let node1 = plane_edges[i][0],node2 = plane_edges[i][1], wt = plane_edges[i][2];

                if(dis_src[node1][0] + wt + dis_des[node2][0] < min_wt)
                {
                        min_wt = dis_src[node1][0] + wt + dis_des[node2][0];
                        p_src = node1;
                        p_des = node2;
                        plane = 1;
                }

                if(dis_des[node1][0] + wt + dis_src[node2][0] < min_wt)
                {
                        min_wt = dis_des[node1][0] + wt + dis_src[node2][0];
                        p_src = node2;
                        p_des = node1;
                        plane = 1;
                }
         }

        console.log(plane,p_src,p_des,dis_src[des],min_wt);


         if(plane)
         {
                final_edges.push({from : p_src , to : p_des , color : 'green', label : String(1000)});

                let node = p_src ,par = dis_src[p_src][1];

                while(par != -1)
                {
                        final_edges.push({from : node , to : par , color : 'orange' , label : String(1000)});

                        node = par;
                        par = dis_src[par][1];
                }

                node = p_des , par = dis_des[p_des][1];

                 while(par != -1)
                {
                        final_edges.push({from : node , to : par , color : 'orange' , label : String(1000)});

                        node = par;
                        par = dis_des[par][1];
                }

         }
         else
         {

                let node = des,par = dis_src[des][1];

                 while(par != -1)
                {
                        final_edges.push({from : node , to : par , color : 'orange' , label : String(1000)});

                        node = par;
                        par = dis_src[par][1];
                }

         }

         for(let i = 0;i < final_edges.length ; i++)
         {
                let found = 0;

                let edge = final_edges[i];

                for(let j = 0; j < ed.length; j++)
                {
                        if(((ed[j][0] == edge.from && ed[j][1] == edge.to) || (ed[j][0] == edge.to && ed[j][1] == edge.from)) && edge.color == 'orange')
                        {
                                found = 1;
                                final_edges[i].label = String(ed[j][2]);
                                break;
                        }
                }
         }

         for(let i = 0;i < final_edges.length ; i++)
         {
                let found = 0;

                let edge = final_edges[i];

                for(let j = 0; j < plane_edges.length; j++)
                {
                        if(((plane_edges[j][0] == edge.from && plane_edges[j][1] == edge.to) || (plane_edges[j][0] == edge.to && plane_edges[j][1] == edge.from)) && edge.color == 'green')
                        {
                                found = 1;
                                final_edges[i].label = String(plane_edges[j][2]);
                                break;
                        }
                }
         }

         console.log(final_edges);


          newdata = {
           
            nodes : obtain_data.nodes,
            edges : final_edges,

         };


         return newdata;

           
    }

    

    genrate.onclick = function()
    {
            
        obtain_data = create_graph();
        //console.log(obtain_data);
        network.setData(obtain_data);
        temptext2.innerText = 'Find least time path from '+cities[src]+' to '+cities[des];
        temptext.style.display = "inline";
        temptext2.style.display = "inline";
        ans_container.style.display = "none";
    }

    ans_genrate.onclick = function()
    {

        ans_data = solve();
        ans_network.setData(ans_data);
        temptext.style.display = "none";
        temptext2.style.display = "none";
        ans_container.style.display = "inline";

    }

  
};

