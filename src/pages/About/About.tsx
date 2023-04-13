import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import * as React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function About() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Game Set Up</AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>Game Set Up</TableHead>
              <TableBody sx={{ textAlign: "start" }}>
                <TableRow>Layout the board and setup the digital companion.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Decide on a turn order, youngest to oldest would be the default. *Note that the viral always goes
                  last no matter what.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Choose 4 players to become the survivors (the game is playable with less survivors but expect
                  difficulty to be unbalanced)
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>• Choose 1 player to become the viral</TableRow>
                <TableRow>
                  Pick your player pieces and set them on the spawn nodes as indicated by the Map Nodes Visual Guide.
                </TableRow>
                <TableRow>
                  Shuffle the deck of 46 item cards and place them face down next to the board. This will be the item
                  draw deck.
                </TableRow>
                <TableRow>Place the 4 keycards faceup next to the item draw deck.</TableRow>
                <TableRow>
                  Set a space aside for the discard pile as well. This is where all used and discarded items will be
                  placed.
                </TableRow>
                <TableRow>You are now ready to start playing!</TableRow>
                <TableRow sx={{ textIndent: 16 }}>• Proceed to the other guides to learn more about the game.</TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

// function About() {
//   return (
//     <div>
//       <h1>About</h1>
//       <p>This is a game that requires 3-5 players.</p>
//       <div className="flex max-w-2xl flex-col gap-2.5">
//         <div className="rounded border border-solid border-white p-2.5">
//           <h1>Map Guide</h1>
//           <ol className="text-justify">
//             <li className="list-inside list-decimal">Nodes</li>
//             <div>
//               <ul className="block">
//                 <li className="list-inside list-disc">
//                   these are the circles where you place character pieces, traps, and obstacles. these are the circles
//                   where you place character pieces, traps, and obstacles.
//                 </li>
//                 <li className="list-inside list-disc">
//                   an adjacent node is one that is right next to the player’s current node.
//                 </li>
//                 <li className="list-inside list-disc">houses are special and as such traps cannot be placed there.</li>
//                 <li className="list-inside list-disc">elevation is indicated by the darker hue of the bottom floor.</li>
//               </ul>
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//             </div>
//             <li className="list-inside list-decimal">Shortcuts</li>
//             <div>
//               <ul className="block">
//                 <li className="list-inside list-disc">these are not nodes but pathways.</li>
//                 <li className="list-inside list-disc">a player cannot stand on them but only cross them.</li>
//                 <li className="list-inside list-disc">nodes separated by shortcuts are not considered adjacent.</li>
//                 <li className="list-inside list-disc">default viral cannot make use of ladder, ziplines, and boats.</li>
//               </ul>
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//               <img className="h-5 w-5" src="/pieces/player-1.png" />
//             </div>
//           </ol>
//         </div>
//         <div className="rounded border border-solid border-white p-2.5">
//           <h1>Play Guide</h1>
//           <ol className="text-justify">
//             <li className="list-inside list-decimal">Player Movement</li>
//             <li className="list-inside list-decimal">Game Setup</li>
//             <li className="list-inside list-decimal">Survivor Gameplay</li>
//             <li className="list-inside list-decimal">Viral Gameplay</li>
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// }

export default About;
