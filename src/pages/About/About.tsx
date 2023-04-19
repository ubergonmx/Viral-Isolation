import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ListItem,
  ListItemIcon,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import acid from "/about/acid.png";
import bear_trap from "/about/bear-trap.png";
import boat from "/about/boat.png";
import boulder from "/about/boulder.png";
import event_node from "/about/event-node.png";
import fallen_tree from "/about/fallen-tree.png";
import gondola_lift from "/about/gondola-lift.png";
import house from "/about/house.png";
import ladder from "/about/ladder.png";
import rat from "/about/rat.png";
import regular_node from "/about/regular-node.png";
import spawn_node from "/about/spawn-node.png";
import tunnel from "/about/tunnel.png";
import viral_node from "/about/viral-node.png";
import zipline from "/about/zipline.png";
import arrow1 from "/about/arrow1.png";
import survivor_piece from "/pieces/player-2.png";
import viral_piece from "/pieces/viral-1.png";


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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Play Guide" {...a11yProps(0)} />
          <Tab label="Map Guide" {...a11yProps(1)} />
          <Tab label="FAQS" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* About Page of Game Setup */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <b>Game Set Up</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {
              <Typography>
                <b>Movement Mechanics</b>
              </Typography>
            }
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What is movement?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Movement is the amount of steps you take decided by dice rolls which can be modified through
                    skills/items but the default is 2 rolls.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Which direction do I move my character piece?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Players may move in any direction but may not step on the same node twice in the same turn. This
                    simply means that you cannot go forwards and backwards in the same turn.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What do I do if I have extra steps remaining?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Players must use up all of their movement for the turn, if there are any extra steps left{" "}
                    <u>you cannot end your turn</u>.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • Note: Dead ends are not an exception to this rule, the map is designed in a way that there is
                    always an alternative path to use all remaining steps, even if it leads to an unfavorable outcome.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • Houses and red/yellow shortcuts are common ways to use up remaining steps quickly.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What if I don’t want to move from my position?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • This is called “Skipping” - it is when a player decides to not roll the dice in favor of staying
                    in the same node.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • <b>Side effect</b>: You must press a button in the digital companion to see which random event you
                    triggered by skipping.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • <b>Limitation</b>: This can only be done every other round.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>
                      I was forced to move extra steps from a random event after skipping, how does that work exactly?
                    </b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• Simply move your character as if you had rolled a “5” this turn.</Typography>}
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>A viral just got pushed by a weapon, how does work?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • The survivor responsible gets to move the viral a certain amount of steps which is stated by the
                    weapon.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • The viral <u>can be pushed across shortcuts</u> which appropriately uses the given steps as usual.
                  </Typography>
                }
              />
            </List>
          </AccordionDetails>
        </Accordion>
        {/* About Page of Balancing */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {
              <Typography>
                <b>Balancing</b>
              </Typography>
            }
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • Since this is a fairly complex game with a lot of mechanics and even asymmetrical elements, any
                    difference in skill among players can lead to a wide gap in player experience. If your play group
                    feels that it is too one-sided, we encourage that you switch the players around or apply any of our
                    optional rules that you can use to balance and make the game more interesting.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Proximity Communication (Survivor Nerf)</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Survivors are <u>not allowed</u> to communicate in real life with other players at all unless they
                    are currently in the process of trading. This is to add another layer of challenge for experienced
                    survivors to strategize.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Keycard+ (Survivor Buff)</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Aside from the unique keycards, allow baseball bats to double function as a keycard as well. Make
                    sure to announce that you got a baseball bat and show it just like a keycard if playing with this
                    rule.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Restless Viral (Viral Nerf)</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Remove the viral’s ability to skip. This effectively removes camping outside houses.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Mind’s eye+ (Viral Buff)</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • In addition to Mind’s eye’s original effect, once at the start of his turn, allow the viral to
                    view the top 3 cards of the deck, and decide to shuffle it or not.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Acid Reflux+ (Viral Buff)</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Allow the viral to place it at any point during his turn rather than just at the start.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    In addition to all of these, any house rules that don’t break the game fundamentally are a great way
                    to balance the game to your liking.
                  </Typography>
                }
              />
            </List>
          </AccordionDetails>
        </Accordion>
        {/* About Page of Survivor */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {
              <Typography>
                <b>Survivor</b>
              </Typography>
            }
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>How do I win?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • As a survivor, your main objective is to find the keycard and escape through the exit node. You
                    can search through all the houses for it or wait for another player to unlock the gate for you, but
                    once you've reached the exit node uninfected then you're now one of this game's winners!
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What can I do during my turn?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>Here’s a quick rundown in order of what a survivor turn should look like:</Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• Use item/s (optional)</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • Note: <u>must be done before moving/skipping</u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • Note: <u>there is no limit for item usage</u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• Choose between movement and skipping (required)</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• Movement - roll 2 dice to determine step count</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• Skipping - 0 steps but activate a random event</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • If <u>survivor is encountered</u> (same node as you) while moving, you may stop and:
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>• Trade - exchange item cards, afterwards continue using your remaining steps</Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • Cure - cure their infection (need cure item), this ends your turn early but you get an additional
                    turn right after.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • Note: <u>can only cure infected players</u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • Note: cured players <u>stay immune to infection</u> for the rest of the round they were cured
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • If <u>viral is encountered</u>, you are forced to stop and either:
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • Fight - use weapon item to prevent infection, afterwards continue using remaining steps
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • Note: If used successfully, <u>stay immune to infection</u> for the rest of this turn.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• Get infected - you will be infected, stop moving</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • If <u>item count is greater than 5</u>, discard one item into the discard pile.
                  </Typography>
                }
              />
              <ListItemText disableTypography sx={{ textAlign: "start", paddingLeft: "16px" }} primary="• End Turn" />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What happens when I’m infected?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • You’re current objective changes to moving towards uninfected players so that you can trade items
                    and they can cure you. While infected your actions will be changed as follows:
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• cannot use any items</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• cannot enter houses</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• movement is only 1 die</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• can break any obstacle/trap with no cost</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • If <u>all players remaining on the board are infected</u>, then the game ends and those players
                    lose. If you want to win, then make sure to cure other survivors whenever possible so that they can
                    do the same for you. Or at the very least escape before being infected yourself!
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Tip:</b> While infected you can help your fellow survivors by clearing up vomit traps and other
                    obstacles since you are immune to them.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Tip:</b> Never let yourself be infected intentionally since this speeds up the growth of the
                    viral exponentially by letting him get more skills early.
                  </Typography>
                }
              />
            </List>
          </AccordionDetails>
        </Accordion>
        {/* About Page of Viral */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {
              <Typography>
                <b>Viral</b>
              </Typography>
            }
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>How do I win?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • As a viral, your main objective is to infect as much survivors as possible. Once all survivors
                    have either escaped or are currently infected, then the game ends. The amount of infected players at
                    the end will determine your performance.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• 3 survivors infected is considered a win</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• 4 survivors infected is considered a perfect victory</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• anything less than those is considered a loss</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    *Note: If playing with less than 4 survivors the only way to win is to infect all of them
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What’s the point in playing if two survivors already escaped?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Even though you’ve already lost, you can still drag down the remaining survivors down with you so
                    try your best not to be the only loser in the group!
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What can I do during my turn?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={<Typography>Here’s a quick rundown of what a viral turn should look like:</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• At the start of your turn, you gain +1 skill point every time</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• Upgrade and choose new skill (uses up 3 skill points)</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• Use active skill/s (optional)</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• Choose between movement and skipping (required)</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• Movement - roll 2 dice to determine steps</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• Skipping - 0 steps but activate random event</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• If uninfected survivor encountered - stop and infect player</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • If onslaught ability has been obtained, gain an extra Turn when you end your Turn.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>• If there are 2 survivors in that node, stop and infect both players.</Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • In this scenario, only 1 of those survivors are required to use an item to prevent infection for
                    both players.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• If infection is successful, +2 skill points.</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• End Turn</Typography>}
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What else should I know about viral skills?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• Use the digital companion to keep track of skill points.</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Refer to the skill tree for the descriptions as well as the order in which they can be unlocked.
                    Skills under require the ability directly above it to be available with Apex needed both sides maxed
                    out.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Passive skills trigger automatically while active skills need to be purposely activated in the
                    proper scenario such as the start of your turn for Mind’s eye and Acid Reflux and encountering an
                    obstacle or weapon for tank.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>I got a rat snack from a random event what is that?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • When this happens take a rat piece from the game pieces into your inventory.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • This functions similarly to the food item card for survivors as it gives you one additional roll
                    at the start of your turn.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• You can only have a max of two rats at a time.</Typography>}
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What is vomit from Acid Reflux?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>Vomit</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • any survivor that steps on it becomes infected (if not already) and stops moving
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• can only be activated by survivors</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• can overwrite existing obstacles because of its acidic properties.</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • successful infection of an uninfected player gives 2 skill points per usual.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>Limitations:</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • Only one can exist at a time. Placing a new one will cause the old vomit to disappear.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• Cannot be placed on houses or through shortcuts.</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• Once activated it will disappear.</Typography>}
              />
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Random Event */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <b>Random Events</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What are random events?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • These are randomly selected effects that can change the state of the game such as by forcing
                    movement, giving free items, and slowing movement among others.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={<Typography>• They can be separated into two groups:</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • <b>Skip events</b> - these trigger whenever a player skips their turn. There are different skip
                    events for viral and survivor
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • <b>Node events</b> - these trigger when ending your turn on an event node. See{" "}
                    <u>Map Guide - Nodes</u> for more details. The events for these are the same for viral and survivor.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={<Typography>• Here is the full list of the chances and effects of the events:</Typography>}
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Survivor</b> (skip turn)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Nothing Happens (40%)</b> - …nothing happens
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Panic attack (20%)</b> - forced to move 5 steps this round
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Lucky day (20%)</b> - shuffle discard pile and draw one, if discard pile is empty then no card
                    is drawn.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Muscle cramps (20%)</b> - lose one dice roll next round.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Viral</b> (skip turn)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Nothing Happens (50%)</b> - …nothing happens
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Random distraction (20%)</b> - forced to move 5 steps this round
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Rat snack (20%)</b> - Obtain a rat nearby as an item. Can be used to add one additional roll.
                    (max 2 at a time)
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>All</b> (random event node)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Fallen boulder (30%)</b> - obstructs path behind players (direction you came from)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Fallen tree (30%)</b> - obstructs path in front of player (direction opposite where you came
                    from)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    • if occupied by another player, <u>move that player to the event node that triggered it</u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• If occupied by another obstacle/trap, overwrite it</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={<Typography>• functions similarly to a trap</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Rainy day (20%)</b> - pathway becomes muddy (movement of players becomes half of what they
                    roll) *lasts until after the next turn of the player who activated the event
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    <b>• Earthquake (20%)</b> - all players inside a house are immediately forced to move one step
                  </Typography>
                }
              />
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Items */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <b>Items</b>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What are items?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • These are found inside houses and can provide various different effects that can help the
                    survivors.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What makes keycard special?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • These are not shuffled into the main deck but instead the digital companion will decide if the
                    house you entered contains your specific keycard.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • At round 10, the digital companion will announce all the keycard locations only one time so pay
                    very close attention.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Keycard ownership is public information and <u>should not be hidden</u>.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• However, players are still allowed to trade keycards.</Typography>}
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What else should I know about items?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• After using/discarding an item, place it in the discard pile.</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Most items can only be used at the start of your turn with the exception of the keycard, weapons,
                    and cure items.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={<Typography>• Here is the full list of all item cards: </Typography>}
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    <u>
                      <b>Unique - 4</b>
                    </u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Keycard</b> - 4
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • used to unlock the exit node allow survivors to escape (MUST BE SHOWN AT ALL TIMES)
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    <u>
                      <b>Movement - 10</b>
                    </u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Adrenaline</b> - 5
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • double your steps from rolls, (must use <b>before rolling</b>)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Food</b> - 5
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • obtain one additional dice roll, (must use <b>before rolling</b>)
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    <u>
                      <b>Weapons - 15</b>
                    </u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Frying pan</b> - 5
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • prevents bite infections for the rest of the turn and pushes viral one node away (can use anytime
                    a viral tries to infect you) (you can choose where the viral gets pushed)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Baseball bat</b> - 5
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • prevents bite infections for the rest of the turn and pushes viral 3 nodes away (can use anytime a
                    viral tries to infect you)(you can choose where the viral gets pushed).
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Bear trap</b> - 5
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • place on <b>current</b> node (cannot be a house) (must use <b>before rolling</b>)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • effect: ends viral’s turn early when stepping on it, then the trap gets discarded
                  </Typography>
                }
              />

              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "32px" }}
                primary={
                  <Typography>
                    <u>
                      <b>Coop items - 21</b>
                    </u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Cure</b> - 11
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>• used to cure infection of another survivor (anytime during your turn)</Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>• after using, end your turn early and get an additional turn right after.</Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • the cured survivor will remain immune to infection for the rest of the round.
                  </Typography>
                }
              />

              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Swapper</b> - 5
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • swaps positions with <u>any player</u> of your choice, (must use <b>before rolling/skipping</b>)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • cannot swap if <u>either player</u> is inside a house
                  </Typography>
                }
              />

              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>Summoner</b> - 5
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • summons <u>any player</u> of your choice to your position, (must use{" "}
                    <b>before rolling/skipping</b>)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "64px" }}
                primary={
                  <Typography>
                    • cannot summon if <u>you</u> are inside a house (player summoned can be from a house)
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "48px" }}
                primary={
                  <Typography>
                    • <b>50 items total</b>
                  </Typography>
                }
              />
            </List>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* About Page of Nodes */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <b>Nodes</b>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • these are the circles where you place character pieces, traps, and obstacles
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • an <u>adjacent</u> node is one that is connected to the player’s current node
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>• all circle nodes function similarly aside from their unique property</Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • <u>houses</u> in particular have a lot of unique properties as seen below
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • note that the <u>black path connected to the exit</u> is elevated and NOT connected to the pathway
                    directly below it aside from the ladder.
                  </Typography>
                }
              />
              <Divider />
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon>
                  <img src={regular_node} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Regular Node</b> - Nothing happens
                      </Typography>
                    }
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon>
                  <img src={event_node} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Event Node</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • Triggers a random general event when ending your turn on it and it is{" "}
                        <u>
                          <b>not</b> occupied by another player, obstacle, or trap
                        </u>{" "}
                        prior to making your last step.
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• Does not trigger upon skipping.</Typography>}
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon>
                  <img src={spawn_node} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Survivor Spawn Node</b> - Spawn point of a survivor
                      </Typography>
                    }
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon>
                  <img src={viral_node} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Viral Spawn Node</b> - Spawn point of the viral
                      </Typography>
                    }
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon>
                  <img src={house} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>House Node</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• chance to get an item upon entering</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "32px" }}
                    primary={
                      <Typography>
                        • (select it in digital companion to determine whether you draw an item card from the pool or
                        obtain a keycard item)
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • consumes <u>all remaining steps</u> upon entering
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• a survivor may not enter the same house twice in the same game</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "32px" }}
                    primary={<Typography>• (this is tracked by the digital companion)</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • viral{" "}
                        <u>
                          <b>cannot</b> enter houses
                        </u>{" "}
                        without the Apex skill
                      </Typography>
                    }
                  />
                </ListItem>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* About Page of Shortcuts */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <b>Shortcuts</b>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={<Typography>• these are not nodes but simply pathways that connect nodes</Typography>}
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • a player <u>cannot stand on them</u> but only cross them
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • nodes separated by shortcuts are <u>not considered adjacent</u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • viral without “Pathfinder” skill <u>cannot use of ANY shortcuts</u>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • once the ability is obtained, viral may use any shortcut as well as use{" "}
                    <u>blue arrow shortcuts in the opposite direction</u> (Cliff Jumps)
                  </Typography>
                }
              />
              <Divider />
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon sx={{ width: "20%", justifyContent: "space-evenly" }}>
                  <img src={ladder} style={{ width: "50px", height: "50px" }}></img>
                  <img src={zipline} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Ladders/Ziplines</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• consumes all remaining steps to cross.</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • symbolized by <u style={{ color: "red" }}>red arrows</u>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• ziplines are one-way downwards</Typography>}
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon sx={{ width: "20%", justifyContent: "space-evenly" }}>
                  <img src={boat} style={{ width: "50px", height: "50px" }}></img>
                  <img src={gondola_lift} style={{ width: "50px", height: "50px" }}></img>
                  <img src={arrow1} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Boat/Gondola lift/Cliff</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • consumes only one step to cross similar to traveling between two regular nodes
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • symbolized by <u style={{ color: "blue" }}>blue arrows</u>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • cliffs are one-way downwards (viral with pathfinder skill is an exception to this)
                      </Typography>
                    }
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon sx={{ width: "20%", justifyContent: "space-evenly" }}>
                  <img src={tunnel} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Underground tunnel</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• consumes all remaining steps to cross</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • symbolized by <u style={{ color: "yellow" }}>a yellow arrow</u>
                      </Typography>
                    }
                  />
                </ListItem>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Game Pieces */}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <b>Game Pieces</b>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • these are circle pieces which you place on the map with the exception of the rat piece which
                    functions as a viral item.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • all traps/obstacles have the same effect of <u>ending a player’s turn early</u> as well as being{" "}
                    <u>removed from the map</u> after its effect.
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    • traps <u>cannot be placed on house nodes or through shortcuts</u>.
                  </Typography>
                }
              />
              <Divider />
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon sx={{ width: "20%", justifyContent: "space-evenly" }}>
                  <img src={survivor_piece} style={{ width: "50px", height: "50px" }}></img>
                  <img src={viral_piece} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        Player pieces: <b>Survivors/Viral</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• these represent the players of the game</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• flipping the survivor pieces indicates infection</Typography>}
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon sx={{ width: "20%", justifyContent: "space-evenly" }}>
                  <img src={bear_trap} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Bear Traps</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• this is a trap that only affects the viral</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • survivors can set this on their current node before choosing to move/skip
                      </Typography>
                    }
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon sx={{ width: "20%", justifyContent: "space-evenly" }}>
                  <img src={acid} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Vomit</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• this is a trap that only affects survivors</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>• the viral can set this on an adjacent node before choosing to move/skip</Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• survivors become infected if not already</Typography>}
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={<Typography>• see Viral Guide to get more in-depth info</Typography>}
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon sx={{ width: "20%", justifyContent: "space-evenly" }}>
                  <img src={fallen_tree} style={{ width: "50px", height: "50px" }}></img>
                  <img src={boulder} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Fallen Trees / Boulders</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>• When landing on an event node, there is a chance that these will spawn</Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • Trees fall in front of you while boulders fall behind you. Direction is based on where you
                        came from before stepping on the event.
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • When triggered to spawn, they will both overwrite any trap placed and force players to move
                        toward the event node
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "32px" }}
                    primary={
                      <Typography>
                        • Note: <u>this can force an infection to happen</u>
                      </Typography>
                    }
                  />
                </ListItem>
              </ListItem>
              <ListItem sx={{ display: "flex", paddingLeft: "16px" }}>
                <ListItemIcon sx={{ width: "20%", justifyContent: "space-evenly" }}>
                  <img src={rat} style={{ width: "50px", height: "50px" }}></img>
                </ListItemIcon>
                <ListItem sx={{ display: "block" }}>
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start" }}
                    primary={
                      <Typography>
                        <b>Rat</b>
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    primary={
                      <Typography>
                        • not an obstacle but an item for the viral which functions similarly to the food item card. (+1
                        dice roll, use at the start of turn)
                      </Typography>
                    }
                  />
                  <ListItemText
                    disableTypography
                    sx={{ textAlign: "start", paddingLeft: "16px" }}
                    //primary="• <u>viral can have a max of 2 rats at a time</u>"
                    primary={<Typography>• viral can have a max of 2 rats at a time</Typography>}
                  />
                </ListItem>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </TabPanel>

      <TabPanel value={value} index={2}>
        {/* FAQS*/}
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <b>FAQ Section</b>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Can both survivors and Viral be considered winners at the same time?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • <b>Yes</b>, when one survivor escapes while the rest are infected, the Viral and escapee are
                    considered winners.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>When can I use items?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • Please refer to the individual item descriptions. As a general rule, all items can only be used at
                    the start of your turn except for Cure, Keycard, and Weapons.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>What happens if the viral encounters two players on the same node?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>• If there are 2 survivors in that node, stop and infect both of them.</Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • In this scenario, only 1 of those survivors are required to use an item to prevent infection for
                    both players.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Is the viral forced to bite players?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • <b>Yes</b>, whenever you are in the same node as a survivor an infection attempt is required.
                  </Typography>
                }
              />
              <Divider />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start" }}
                primary={
                  <Typography>
                    <b>Can I use weapons to prevent infection from vomit traps?</b>
                  </Typography>
                }
              />
              <ListItemText
                disableTypography
                sx={{ textAlign: "start", paddingLeft: "16px" }}
                primary={
                  <Typography>
                    • <b>No</b>, vomit traps are forced infections no matter what.
                  </Typography>
                }
              />
            </List>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
    </div>
  );
}

export default About;
