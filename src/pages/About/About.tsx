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
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

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
          {/*}
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
          */}

          <List>
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="• Layout the board and setup the digital companion."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• The digital companion will randomly decide turn order."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Note that the viral always goes last no matter what."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Choose 4 players to become the survivors (the game is playable with less survivors but expect difficulty to be unbalanced)"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Choose 1 player to become the viral"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="• Pick your player pieces and set them on any of the spawn nodes as indicated by the Nodes section in Map Guides."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="• Shuffle the deck of 46 item cards and place them face down next to the board. This will be the item draw deck."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="• Place the 4 keycards face-up next to the item draw deck."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="• Set a space aside for the discard pile as well. This is where all used and discarded items will be placed."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="• You are now ready to start playing!"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Proceed to the other guides to learn more about the game."
            />
          </List>
        </AccordionDetails>
      </Accordion>
      {/* About Page of Movements */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Movement Mechanics</AccordionSummary>
        <AccordionDetails>
          {/*
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
        */}
          <List>
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="What is movement?" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Movement is the amount of steps you take decided by dice rolls which can be modified through skills/items but the default is 2 rolls."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Which direction do I move my character piece?."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Players may move in any direction but may not step on the same node twice in the same turn. This simply means that you cannot go forwards and backwards in the same turn."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="What do I do if I have extra steps remaining?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Players must use up all of their movement for the turn, if there are any extra steps left you cannot end your turn."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Note: Dead ends are not an exception to this rule, the map is designed in a way that there is always an alternative path to use all remaining steps, even if it leads to an unfavorable outcome."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Houses and red/yellow shortcuts are common ways to use up remaining steps quickly."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="What if I don’t want to move from my position?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• This is called “Skipping” - it is when a player decides to not roll the dice in favor of staying in the same node."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Side effect: You must press a button in the digital companion to see which random event you triggered by skipping."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Limitation: This can only be done every other round."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="I was forced to move extra steps from a random event after skipping, how does that work exactly?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Simply move your character as if you had rolled a “5” this turn."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="A viral just got pushed by a weapon, how does work?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• The survivor responsible gets to move the viral a certain amount of steps which is stated by the weapon."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• The viral can be pushed across shortcuts which appropriately uses the given steps as usual."
            />
          </List>
        </AccordionDetails>
      </Accordion>
      {/* About Page of Balancing */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Balancing</AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="• Since this is a fairly complex game with a lot of mechanics and even asymmetrical elements, any difference in skill among players can lead to a wide gap in player experience. If your play group feels that it is too one-sided, we encourage that you switch the players around or apply any of our optional rules that you can use to balance and make the game more interesting."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Proximity Communication (Survivor Nerf)"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Survivors are not allowed to communicate in real life with other players at all unless they are currently in the process of trading. This is to add another layer of challenge for experienced survivors to strategize."
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="Keycard+ (Survivor Buff)" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Aside from the unique keycards, allow baseball bats to double function as a keycard as well. Make sure to announce that you got a baseball bat and show it just like a keycard if playing with this rule."
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="Restless Viral  (Viral Nerf)" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Remove the viral’s ability to skip. This effectively removes camping outside houses."
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="Mind’s eye+ (Viral Buff)" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• In addition to Mind’s eye’s original effect, once at the start of his turn, allow the viral to view the top 3 cards of the deck, and decide to shuffle it or not."
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="Acid Reflux+ (Viral Buff)" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Allow the viral to place it at any point during his turn rather than just at the start."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="In addition to all of these, any house rules that don’t break the game fundamentally are a great way to balance the game to your liking."
            />
          </List>
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
          <List>
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="How do I win?" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• As a survivor, your main objective is to find the keycard and escape through the exit node. You can
              search through all the houses for it or wait for another player to unlock the gate for you, but once
              you've reached the exit node uninfected then you're now one of this game's winners!"
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="What can I do during my turn?" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Here’s a quick rundown in order of what a survivor turn should look like:"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Use item/s (optional)"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Note: must be done before moving/skipping"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Note: there is no limit for item usage"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Choose between movement and skipping (required)"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Movement - roll 2 dice to determine step count"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Skipping - 0 steps but activate a random event"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• If survivor is encountered (same node as you) while moving, you may stop and:"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Trade - exchange item cards, afterwards continue using your remaining steps"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Cure - cure their infection (need cure item), this ends your turn early but you get an additional turn right after."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "48px" }}
              primary="• Note: can only cure infected players"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "48px" }}
              primary="• Note: cured players stay immune to infection for the rest of the round they were cured"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• If viral is encountered, you are forced to stop and either:"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Fight - use weapon item to prevent infection, afterwards continue using remaining steps"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "48px" }}
              primary="• Note: If used successfully, stay immune to infection for the rest of this turn."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Get infected - you will be infected, stop moving"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• If item count is greater than 5, discard one item into the discard pile."
            />
            <ListItemText disableTypography sx={{ textAlign: "start", paddingLeft: "16px" }} primary="• End Turn" />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="What happens when I’m infected?" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• You’re current objective changes to moving towards uninfected players so that you can trade items and they can cure you. While infected your actions will be changed as follows:"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• cannot use any items"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• cannot enter houses"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• movement is only 1 die"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• can break any obstacle/trap with no cost"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• If all players remaining on the board are infected, then the game ends and those players lose. If you want to win, then make sure to cure other survivors whenever possible so that they can do the same for you. Or at the very least escape before being infected yourself!"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Tip: While infected you can help your fellow survivors by clearing up vomit traps and other obstacles since you are immune to them."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Tip: Never let yourself be infected intentionally since this speeds up the growth of the viral exponentially by letting him get more skills early."
            />
          </List>
          {/*
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
          */}
        </AccordionDetails>
      </Accordion>
      {/* About Page of Viral */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Viral</AccordionSummary>
        <AccordionDetails>
          {/*
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
        */}
          <List>
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="How do I win?" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• As a viral, your main objective is to infect as much survivors as possible. Once all survivors have either escaped or are currently infected, then the game ends. The amount of infected players at the end will determine your performance."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• 3 survivors infected is considered a win"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• 4 survivors infected is considered a perfect victory"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• anything less than those is considered a loss"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="*Note: If playing with less than 4 survivors the only way to win is to infect all of them"
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="What’s the point in playing if two survivors already escaped?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Even though you’ve already lost, you can still drag down the remaining survivors down with you so try your best not to be the only loser in the group!"
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="What can I do during my turn?" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Here’s a quick rundown of what a viral turn should look like:"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• At the start of your turn, you gain +1 skill point every time"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Upgrade and choose new skill (uses up 3 skill points)"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Use active skill/s (optional)"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Choose between movement and skipping (required)"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Movement - roll 2 dice to determine steps"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Skipping - 0 steps but activate random event"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• If uninfected survivor encountered - stop and infect player"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• If onslaught ability has been obtained, gain an extra Turn when you end your Turn."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• If there are 2 survivors in that node, stop and infect both players."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "48px" }}
              primary="• In this scenario, only 1 of those survivors are required to use an item to prevent infection for both players."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• If infection is successful, +2 skill points."
            />
            <ListItemText disableTypography sx={{ textAlign: "start", paddingLeft: "16px" }} primary="• End Turn" />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="What else should I know about viral skills?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Use the digital companion to keep track of skill points."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Refer to the skill tree for the descriptions as well as the order in which they can be unlocked. Skills under require the ability directly above it to be available with Apex needed both sides maxed out."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Passive skills trigger automatically while active skills need to be purposely activated in the proper scenario such as the start of your turn for Mind’s eye and Acid Reflux and encountering an obstacle or weapon for tank."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="I got a rat snack from a random event what is that?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• When this happens take a rat piece from the game pieces into your inventory."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• This functions similarly to the food item card for survivors as it gives you one additional roll at the start of your turn."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• You can only have a max of two rats at a time."
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="What is vomit from Acid Reflux?" />
            <ListItemText disableTypography sx={{ textAlign: "start", paddingLeft: "16px" }} primary="Vomit" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• any survivor that steps on it becomes infected (if not already) and stops moving"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• can only be activated by survivors"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• can overwrite existing obstacles because of its acidic properties."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• successful infection of an uninfected player gives 2 skill points per usual."
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start", paddingLeft: "16px" }} primary="Limitations:" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Only one can exist at a time. Placing a new one will cause the old vomit to disappear."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Cannot be placed on houses or through shortcuts."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "32px" }}
              primary="• Once activated it will disappear."
            />
          </List>
        </AccordionDetails>
      </Accordion>
      {/* About Page of Viral */}
      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>FAQ Section</AccordionSummary>
        <AccordionDetails>
          {/*
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
        */}
          <List>
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Can both survivors and Viral be considered winners at the same time?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Yes, when one survivor escapes while the rest are infected, the Viral and escapee are considered winners."
            />
            <Divider />
            <ListItemText disableTypography sx={{ textAlign: "start" }} primary="When can I use items?" />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Please refer to the individual item descriptions. As a general rule, all items can only be used at the start of your turn except for Cure, Keycard, and Weapons."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="What happens if the viral encounters two players on the same node?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• If there are 2 survivors in that node, stop and infect both of them."
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• In this scenario, only 1 of those survivors are required to use an item to prevent infection for both players."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Is the viral forced to bite players?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• Yes, whenever you are in the same node as a survivor an infection attempt is required."
            />
            <Divider />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start" }}
              primary="Can I use weapons to prevent infection from vomit traps?"
            />
            <ListItemText
              disableTypography
              sx={{ textAlign: "start", paddingLeft: "16px" }}
              primary="• No, vomit traps are forced infections no matter what."
            />
          </List>
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
