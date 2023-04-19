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
      {/* About Page of Game Setup */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Game Set Up</AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody sx={{ textAlign: "start" }}>
                <TableRow>Layout the board and setup the digital companion.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>• The digital companion will randomly decide turn order.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>• Note that the viral always goes last no matter what.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Choose 4 players to become the survivors (the game is playable with less survivors but expect
                  difficulty to be unbalanced)
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>• Choose 1 player to become the viral</TableRow>
                <TableRow>
                  Pick your player pieces and set them on any of the spawn nodes as indicated by the Nodes section in
                  Map Guides.
                </TableRow>
                <TableRow>
                  Shuffle the deck of 46 item cards and place them face down next to the board. This will be the item
                  draw deck.
                </TableRow>
                <TableRow>Place the 4 keycards face-up next to the item draw deck.</TableRow>
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
      {/* About Page of Movements */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Movement Mechanics</AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody sx={{ textAlign: "start" }}>
                <TableRow>
                  <b>What is movement?</b>
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Movement is the amount of steps you take decided by dice rolls which can be modified through
                  skills/items but the default is 2 rolls.
                </TableRow>
                <TableRow>Which direction do I move my character piece?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Players may move in any direction but may not step on the same node twice in the same turn. This
                  simply means that you cannot go forwards and backwards in the same turn.
                </TableRow>
                <TableRow>What do I do if I have extra steps remaining?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Players must use up all of their movement for the turn, if there are any extra steps left{" "}
                  <u>you cannot end your turn</u>.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • Note: Dead ends are not an exception to this rule, the map is designed in a way that there is always
                  an alternative path to use all remaining steps, even if it leads to an unfavorable outcome.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • Houses and red/yellow shortcuts are common ways to use up remaining steps quickly.
                </TableRow>
                <TableRow>What if I don’t want to move from my position?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • This is called “Skipping” - it is when a player decides to not roll the dice in favor of staying in
                  the same node.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • Side effect: This triggers a random event from the digital companion.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>• Limitation: This can only be done every other round.</TableRow>
                <TableRow>
                  • I was forced to move extra steps from a random event after skipping, how does that work exactly?
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Simply move your character as if you had rolled 5 steps turns this turn.
                </TableRow>
                <TableRow>• A viral just got pushed by a weapon, how does work?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • The survivor responsible gets to move the viral a certain amount of steps which is stated by the
                  weapon.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • The viral <u>can be pushed across shortcuts</u> which appropriately uses the given steps as usual.
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* About Page of Nodes */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Nodes</AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody sx={{ textAlign: "start" }}>
                <TableRow sx={{ textIndent: 16 }}>
                  • these are the circles where you place character pieces, traps, and obstacles.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • an adjacent node is one that is right next to the player's current node.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • houses are special and as such traps cannot be placed there.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • elevation is indicated by the darker hue of the bottom floor.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • notably the bridge to the exit is not connected to the underground pathway except through the ladder
                  shortcut.
                </TableRow>
                <TableRow sx={{ textIndent: 40 }}>Image 1: Regular Node - Nothing happens.</TableRow>
                <TableRow sx={{ textIndent: 40 }}>
                  Image 2: Event Node - Random general event when ending on it.
                </TableRow>
                <TableRow sx={{ textIndent: 40 }}>
                  Image 3: Exit Node - Goal of the survivors, initially requires key card to be opened.
                </TableRow>
                <TableRow sx={{ textIndent: 40 }}>Image 4: Survivor Spawn Node - Spawn point of a survivor.</TableRow>
                <TableRow sx={{ textIndent: 40 }}>Image 5: Viral Spawn Node - Spawn point of the viral.</TableRow>
                <TableRow sx={{ textIndent: 40 }}>Image 6: House Node:</TableRow>
                <TableRow sx={{ textIndent: 90 }}>• chance to get an item upon entering.</TableRow>
                <TableRow sx={{ textIndent: 90 }}>• consumes all remaining steps upon entering.</TableRow>
                <TableRow sx={{ textIndent: 90 }}>
                  • a survivor may not enter the same house twice in the same game.
                </TableRow>
                <TableRow sx={{ textIndent: 90 }}>• viral cannot enter houses without the Apex skill.</TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* About Page of Shortcuts */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Shortcuts</AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody sx={{ textAlign: "start" }}>
                <TableRow sx={{ textIndent: 16 }}>• these are not nodes but pathways.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>• a player cannot stand on them but only cross them.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>• nodes separated by shortcuts are not considered adjacent.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • default viral cannot make use of ladder, zip lines, and boats.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • once leaping ability is obtained, viral can use any shortcut.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  Image 1.1, Image 1.2: Ladders/Zip lines - Consumes all remaining steps to cross, zip lines is one way.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  Image 2.1, Image 2.2: Boat/Gondola lift - Consumes only one step to cross, lift is only one way
                  upwards.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  Image 3.1, Image 3.2: Cliff jumps - Consumes only one step to cross but is one-way downwards (note:
                  viral with leaping ability can jump upwards as well).
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  Image 4.1, Image 4.2: Boat/Gondola lift - Underground tunnel - Consumes all remaining steps to cross
                  (note: viral with leaping ability still costs all steps to use).
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* About Page of Survivor */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Survivor</AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody sx={{ textAlign: "start" }}>
                <TableRow sx={{ textIndent: 16 }}>How do I win?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • As a survivor, your main objective is to find the keycard and escape through the exit node. You can
                  search through all the houses for it or wait for another player to unlock the gate for you, but once
                  you've reached the exit node uninfected then you're now one of this game's winners!
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>What can I do during my turn?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  Here's a quick rundown of what a survivor turn should look like:
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>• Use item/s (optional)</TableRow>
                <TableRow sx={{ textIndent: 32 }}>• Note: must be done before moving/skipping</TableRow>
                <TableRow sx={{ textIndent: 16 }}>• Choose between movement and skipping (required)</TableRow>
                <TableRow sx={{ textIndent: 32 }}>• Movement - roll 2 dice to determine step count</TableRow>
                <TableRow sx={{ textIndent: 32 }}>• Skipping - 0 steps but activate a random event</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • If survivor is encountered (same node as you) while moving, you may stop and:
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • Trade - exchange item cards, afterwards continue using your remaining steps
                </TableRow>
                <TableRow sx={{ textIndent: 48 }}>• Note: cannot trade with infected players</TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • Cure - cure their infection (need cure item), this ends your turn early but you get an an additional
                  turn right after.
                </TableRow>
                <TableRow sx={{ textIndent: 48 }}>• Note: can only cure infected players</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  I was forced to move extra steps from a random event, how does that work?
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • If viral is encountered, you are forced to stop and either:
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • Fight - use weapon item to prevent infection, afterwards continue using remaining steps.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>• Get infected - you will be infected, stop moving.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • If item count is greater than 5, discard one item into the discard pile.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>• End Turn.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>What happens when I'm infected?</TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • You're current objective changes to moving towards uninfected players so that you can trade items
                  and they can cure you. While infected your actions will be limited as follows:
                </TableRow>
                <TableRow sx={{ textIndent: 48 }}>• cannot use any items.</TableRow>
                <TableRow sx={{ textIndent: 48 }}>• cannot enter houses.</TableRow>
                <TableRow sx={{ textIndent: 48 }}>• movement is only 1 die.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  Note: You can also help your fellow survivors by using up vomit traps set by the viral since you have
                  nothing to lose.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • If all players remaining on the board are infected, then the game ends and those players lose. If
                  you want to win, then make sure to cure other survivors whenever possible so that they can do the same
                  for you. Or at the very least escape before being infected yourself!.
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* About Page of Viral */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Viral</AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableBody sx={{ textAlign: "start" }}>
                <TableRow sx={{ textIndent: 16 }}>How do I win?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • As a viral, your main objective is to infect all the survivors. Once all survivors have either
                  escaped or are currently infected, then the game ends. The amount of infected players at the end will
                  determine your performance.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>• 3 survivors infected is considered a win.</TableRow>
                <TableRow sx={{ textIndent: 32 }}>• 4 survivors infected is considered a perfect victory.</TableRow>
                <TableRow sx={{ textIndent: 32 }}>• anything less than those is considered a loss.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  *Note: If playing with less than 4 survivors the only way to win is to infect all of them.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  What's the point in playing if two survivors already escaped?
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Even though you've already lost, you can still drag down the remaining survivors down with you so
                  try your best not to be the only loser in the group!
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>What can I do during my turn?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  Here's a quick rundown of what a viral turn should look like:
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • At the start of your turn, you gain +1 skill point every time.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Upgrade and choose new skill (if at least 3 skill points accumulated).
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>• Use skill/s (optional).</TableRow>
                <TableRow sx={{ textIndent: 16 }}>• Choose between movement and skipping (required):</TableRow>
                <TableRow sx={{ textIndent: 32 }}>• Movement - roll 2 dice to determine steps.</TableRow>
                <TableRow sx={{ textIndent: 32 }}>• Skipping - 0 steps but activate random event.</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • If uninfected survivor encountered - stop and infect player
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>
                  • If there are 2 survivors in that node, stop and infect both of them.
                </TableRow>
                <TableRow sx={{ textIndent: 48 }}>
                  • In this scenario, only 1 of those survivors are required to use an item to prevent infection for
                  both players.
                </TableRow>
                <TableRow sx={{ textIndent: 32 }}>• If infection is successful, +2 skill points.</TableRow>
                <TableRow sx={{ textIndent: 48 }}>
                  • If onslaught ability has been obtained, after end turn you get an additional turn.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>• End Turn.</TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* About Page of Viral */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>FAQ Section</AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table>
              <TableHead>FAQ Section</TableHead>
              <TableBody sx={{ textAlign: "start" }}>
                <TableRow sx={{ textIndent: 16 }}>
                  Can both survivors and Viral be considered winners at the same time?
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Yes, when one survivor escapes while the rest are infected, the Viral and escapee are considered
                  winners.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>When can I use items?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Please refer to the individual item descriptions. As a general rule, all items can only be used at
                  the start of your turn except for Cure, Keycard, and Weapons.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  What happens if the viral encounters two players on the same node?
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • If there are 2 survivors in that node, stop and infect both of them.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • In this scenario, only 1 of those survivors are required to use an item to prevent infection for
                  both players.
                </TableRow>
                <TableRow sx={{ textIndent: 16 }}>Is the viral forced to bite players?</TableRow>
                <TableRow sx={{ textIndent: 16 }}>
                  • Yes, whenever you are in the same node as a survivor an infection attempt is required.
                </TableRow>
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
