// import React, {useState} from 'react';

// export const Tabs = ({children}) => {
//   const [activeTab, setActiveTab] = useState(children[0].props.label);

//   const handleClick = (e, newActiveTab) => {
//     e.preventDefault();
//     setActiveTab(newActiveTab);
//   };

//   return (
//     <div className='max-w-md mx-auto'>
//       <div className='flex border-b border-gray-300'>
//         {children.map(child => (
//           <button
//             key={child.props.label}
//             className={`${
//               activeTab === child.props.label
//                 ? 'border-b-2 border-purple-500'
//                 : ''
//             } flex-1 text-gray-700 font-medium py-2`}
//             onClick={e => handleClick(e, child.props.label)}
//           >
//             {child.props.label}
//           </button>
//         ))}
//       </div>
//       <div className='py-4'>
//         {children.map(child => {
//           if (child.props.label === activeTab) {
//             return <div key={child.props.label}>{child.props.children}</div>;
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// };

// export const Tab = ({label, children}) => {
//   return (
//     <div label={label} className='hidden'>
//       {children}
//     </div>
//   );
// };


// const DisplayTabs = () => {
//   return (
//     <div>
//       <Tabs>
//         <Tab label='Tab 1'>
//           <div className='py-4'>
//             <h2 className='text-lg font-medium mb-2'>Tab 1 Content</h2>
//             <p className='text-gray-700'>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
//               mollitia, molestiae quas vel sint commodi repudiandae consequuntur
//               voluptatum laborum numquam blanditiis harum quisquam eius sed odit
//               fugiat iusto fuga praesentium optio, eaque rerum! Provident
//               similique accusantium nemo autem. Veritatis obcaecati tenetur iure
//               eius earum ut molestias architecto voluptate aliquam nihil,
//               eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
//               tenetur error, harum nesciunt ipsum debitis quas aliquid.
//               Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
//               laudantium molestias eos sapiente officiis modi at sunt excepturi
//               expedita sint? Sed quibusdam recusandae alias error harum maxime
//               adipisci amet laborum.
//             </p>
//           </div>
//         </Tab>
//         <Tab label='Tab 2'>
//           <div className='py-4'>
//             <h2 className='text-lg font-medium mb-2'>Tab 2 Content</h2>
//             <p className='text-gray-700'>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
//               mollitia, molestiae quas vel sint commodi repudiandae consequuntur
//               voluptatum laborum numquam blanditiis harum quisquam eius sed odit
//               fugiat iusto fuga praesentium optio, eaque rerum! Provident
//               similique accusantium nemo autem. Veritatis obcaecati tenetur iure
//               eius earum ut molestias architecto voluptate aliquam nihil,
//               eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
//               tenetur error, harum nesciunt ipsum debitis quas aliquid.
//               Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
//               laudantium molestias eos sapiente officiis modi at sunt excepturi
//               expedita sint? Sed quibusdam recusandae alias error harum maxime
//               adipisci amet laborum.
//             </p>
//           </div>
//         </Tab>
//         <Tab label='Tab 3'>
//           <div className='py-4'>
//             <h2 className='text-lg font-medium mb-2'>Tab 3 Content</h2>
//             <p className='text-gray-700'>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
//               mollitia, molestiae quas vel sint commodi repudiandae consequuntur
//               voluptatum laborum numquam blanditiis harum quisquam eius sed odit
//               fugiat iusto fuga praesentium optio, eaque rerum! Provident
//               similique accusantium nemo autem. Veritatis obcaecati tenetur iure
//               eius earum ut molestias architecto voluptate aliquam nihil,
//               eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
//               tenetur error, harum nesciunt ipsum debitis quas aliquid.
//               Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
//               laudantium molestias eos sapiente officiis modi at sunt excepturi
//               expedita sint? Sed quibusdam recusandae alias error harum maxime
//               adipisci amet laborum.
//             </p>
//           </div>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

// export default DisplayTabs;