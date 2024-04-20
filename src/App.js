import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls,MarkerType,applyEdgeChanges,applyNodeChanges } from 'reactflow';
import './App.css';
import { useState,useCallback,useRef} from 'react';
import CustomNode from './Customnode';

const Nodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
  
  },

];
function App() {
  const [variant,setvariant]=useState('cross');
  const [nodes, setNodes] = useState(Nodes);
  const [edges, setEdges] = useState([{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'smothstep' },]);
  const [edgenumber,setedgenumber]=useState(1)
  const [yaxis,setyaxis]=useState(50);
  const addNode = useCallback(() => {
      let random=Math.random();
      let convertednumber=random.toString();
      setyaxis((yaxis)=>{
        return yaxis+50
      })
      console.log("add node is called",nodes,nodes.length)
      let newnode={
        id:convertednumber,
        position:{x:100,y:yaxis},
        data:{label:"node added"}}
     setNodes(nodes => [...nodes, newnode]); 
  if(nodes.length>1){
     let newarray=[...nodes];
     let lastelement=nodes.length;
     let lastbtone=nodes.length-1;
     let lastindex=newarray[lastelement-1];let lastindexid=lastindex.id
     let lastbutoneindex=newarray[lastbtone];let lastbutoneid=lastbutoneindex.id

     let newobject={};
        newobject.id='edge-'+edgenumber.toString();
        setedgenumber((edgenumber)=>edgenumber+1)
        newobject.source=lastbutoneid;
        newobject.target=lastindexid;
        setEdges(edges=>[...edges,newobject])
   }
    }, [nodes,edgenumber,yaxis]); 
  
     const deleteNode = useCallback((id) => {
       setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
       setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== id && edge.target !== id));
     }, []);
 
    const updateNodeTitle = useCallback((id,title) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => (node.id === id ? { ...node, data: { ...node.data, label: title} } : node))
      );
   }, []);
const addEdge=useCallback(({source,target})=>{
  setNodes((nodes)=>{
    return [
       ...nodes,{id:Math.random(),source,target}
    ]   })
  },[])
 
  return (
    <div className='App'>
    <div style={{ height: 300 }}>
   <ReactFlow nodes={nodes} edges={edges}  >
  <Background variant={variant}  />
        <Controls />
   </ReactFlow>
   <button className='button' onClick={addNode} type='button'>ADD NODE</button>
   </div>

   


    {nodes.map((node) => (
        <CustomNode
          key={node.id}
          id={node.id}
          data={node.data}
          onDelete={deleteNode}
          onTitleChange={updateNodeTitle}
        />
      ))}
   </div>
  );
}

export default App;
//color="red" gap={[50,50]}