<script setup></script>

<template>
  <v-container>
    <p>Note: If lost, feel free to play around with the presets! Full details can be found <a href="https://github.com/gerizim16/3d-l-system-generator">here</a>.</p><br>
    <h2>Symbols</h2> <br>
    <p> Symbols may have parameters. They are of the format: </p>
    <p class="code">symbol{param1, param2, ...}</p><br>

    <p>Parameters are separted by commas. Parameters are optional, thus, the following is also valid:</p>
    <p class="code">symbol</p><br>
    
    <p>Symbols may either be:</p>
    <ul>
      <li>[Special symbols (commands)](#commands): uses lowercase characters. These symbols are used to control the turtle. Examples are: <mark>&nbsp;+x&nbsp;</mark>, <mark>&nbsp;l&nbsp;</mark>, <mark>&nbsp;-z&nbsp;</mark>.</li>
      <li>Non-special symbols (variables): uses uppercase characters. Examples are: <mark>&nbsp;A </mark>, <mark>&nbsp;BRANCH </mark>, <mark>&nbsp;X </mark>.</li>
    </ul><br>
    <h2>Commands</h2> <br>
    <v-table class="slds-scrollable top-scrollbars">
      <tbody>
        <tr>
          <th>Symbol</th>
          <th>Parameters</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><mark>&nbsp;m{color, roughness, metalness, flatShading, fog, wireframe, transparent, opacity, side}&nbsp;</mark></td>
          <td>
            <ul>
              <li>color=0xffffff : color in hex</li>
              <li>roughness=0.1 : [0, 1]</li>
              <li>metalness=0.1 : [0, 1]</li>
              <li>flatShading=false : true or false</li>
              <li>fog=true : influence material with fog</li>
              <li>wireframe=false : render as wireframe</li>
              <li>transparent=false : enable transparency</li>
              <li>opacity=1 : opacity when transparency is enabled</li>
              <li>side=0 : 0=render front side, 1=render back side, 2=render both sides</li>
            </ul>
          </td>
          <td>Set current turtle material.</td>
        </tr>
        <tr>
          <td><mark>&nbsp;f{len}&nbsp;</mark></td>
          <td><ul><li>len=defaults.length : length</li></ul></td>
          <td>Move the turtle forward <mark>&nbsp;len&nbsp;</mark> units.</td>
        </tr>
        <tr>
          <td><mark>&nbsp;l{len, startR, endR}&nbsp;</mark></td>
          <td>
            <ul>
              <li>len=defaults.length : length</li>
              <li>startR=turtle.radius : starting radius</li>
              <li>endR=turtle.radius : ending radius</li>
            </ul>
          </td>
          <td>Draw a cylinder of <mark>&nbsp;len&nbsp;</mark> units and move forward <mark>&nbsp;len&nbsp;</mark> units starting with a radius of <mark>&nbsp;startR&nbsp;</mark> and ending with <mark>&nbsp;endR&nbsp;</mark>.</td>
        </tr>
        <tr>
          <td><mark>&nbsp;r{rad}&nbsp;</mark></td>
          <td><ul>
            <li>rad=defaults.radius : radius</li>
          </ul></td>
          <td>Set the radius of the turtle to <mark>&nbsp;rad&nbsp;</mark>.</td>
        </tr>
        <tr>
          <td><mark>&nbsp;s&nbsp;</mark></td>
          <td></td>
          <td>Begin drawing a curve.</td>
        </tr>
        <tr>
          <td><mark>&nbsp;e&nbsp;</mark></td>
          <td></td>
          <td>End the curve, draw the finished curve.</td>
        </tr>
        <tr>
          <td><mark>&nbsp;t{ten}&nbsp;</mark></td>
          <td><ul><li>ten=0.5 : tension</li></ul></td>
          <td>Set the tension of the curve. <mark>&nbsp;[0, 1]&nbsp;</mark></td>
        </tr>
        <tr>
          <td><mark>&nbsp;+x{angle}&nbsp;</mark></td>
          <td><ul><li>angle=defaults.angle : angle in degrees</li></ul></td>
          <td>Pitch control. Increase pitch by <mark>&nbsp;angle&nbsp;</mark> degrees.</td>
        </tr>
        <tr>
        <td><mark>&nbsp;-x{angle}&nbsp;</mark></td>
        <td>angle=defaults.angle : angle in degrees</td>
        <td>Pitch control. Decrease pitch by <mark>&nbsp;angle&nbsp;</mark> degrees.</td>
    </tr>
    <tr>
        <td><mark>&nbsp;+y{angle}&nbsp;</mark></td>
        <td>angle=defaults.angle : angle in degrees</td>
        <td>Yaw control. Increase yaw by <mark>&nbsp;angle&nbsp;</mark> degrees.</td>
    </tr>
    <tr>
        <td><mark>&nbsp;-y{angle}&nbsp;</mark></td>
        <td>angle=defaults.angle : angle in degrees</td>
        <td>Yaw control. Decrease yaw by <mark>&nbsp;angle&nbsp;</mark> degrees.</td>
    </tr>
    <tr>
        <td><mark>&nbsp;-z{angle}&nbsp;</mark></td>
        <td>angle=defaults.angle : angle in degrees</td>
        <td>Roll control. Increase roll by <mark>&nbsp;angle&nbsp;</mark> degrees.</td>
    </tr>
    <tr>
        <td><mark>&nbsp;-z{angle}&nbsp;</mark></td>
        <td>angle=defaults.angle : angle in degrees</td>
        <td>Roll control. Decrease roll by <mark>&nbsp;angle&nbsp;</mark> degrees.</td>
    </tr>
    <tr>
        <td><mark>&nbsp;[&nbsp;</mark></td>
        <td></td>
        <td>Push state to stack. State includes turtle position, material, tension, radius</td>
    </tr>
    <tr>
        <td><mark>&nbsp;]&nbsp;</mark></td>
        <td></td>
        <td>Pop state from stack and set it to current state.</td>
    </tr>
    <tr>
        <td><mark>&nbsp;sphere{r, widthSeg, heightSeg, phi, phiLen, theta, thetaLen}&nbsp;</mark></td>
        <td>r=defaults.size/2 : radius </td>
        <td>Draws a sphere centered at the turtle's position. May be used to draw "leaves": <mark>&nbsp;m{0x50C878, 0.7, 0, false, true, false, true, 0.8, 2} sphere{random()/7+0.1, 12, 6, 0, pi/2, 0, pi}&nbsp;</mark></td>
    </tr>
    <tr>
        <td><mark>&nbsp;box{w, h, d}&nbsp;</mark></td>
        <td>w=defaults.size : width</td>
        <td>Draws a box centered at the turtle's position and aligned with the turtle's axes.</td>
    </tr>
    <tr>
        <td><mark>&nbsp;cube{s}&nbsp;</mark></td>
        <td>s=defaults.size : side length</td>
        <td>Draws a cube centered at the turtle's position and aligned with the turtle's axes.</td>
    </tr>
    <tr>
        <td><mark>&nbsp;cone{r, h, radialSeg}&nbsp;</mark></td>
        <td>r=defaults.size/2 : base radius</td>
        <td>Draws a cone centered at the turtle's position and aligned with the turtle's axes. Can be used to draw pyramids such as a square base pyramid: <mark>&nbsp;cone{r, h, 4}&nbsp;</mark>.</td>
    </tr>
      </tbody>
    </v-table>
    <h2>Axiom</h2> <br>
    <p>Axiom is a list of symbols separated by whitespace character(s). It is of the format:</p>
    <p class="code">symbol1{param1_1, param1_2, ...} symbol2 ...</p><br>
    <p>Parameters of symbols in an axiom must evaluate to a constant. Some valid constant parameters are:</p>
    <p class="code">symbol{sin(pi/2)}   // 1<br>
      symbol{sin(30 deg)} // 0.5<br>
      symbol{pi}          // 3.1415926535898<br>
      symbol{1.2}         // 1.2<br>
      symbol{log(e)}      // 1<br>
      symbol{true}        // true<br>
      symbol{false}       // false<br>
      symbol{random()}</p><br>
    <p>Parameters are evaluated using <a href="https://mathjs.org/">math.js</a>. More functions can be found <a href="https://mathjs.org/docs/reference/functions.html">here</a>.</p>
    <br>
    <h2>Production rules</h2> <br>
    <p>Production rules are of the format:</p>
    <p class="code">symbol{var1, var2, ...} -> new_symbol1{param1, param2, ...} new_symbol2 new_symbol3 ...</p><br>
    <p>Parameters of the symbol on the left hand side must be variables. For clarity, an example is the following:</p>
    <p class="code">symbol{a, b, c} -> new_symbol1{a + 1} new_symbol2{2 * b, c}</p><br>
    <p>All parameters are optional. Thus, the following is also valid:</p>
    <p class="code">symbol -> new_symbol1 ...</p><br>
    <p>Special symbols may be used in the left hand side in production rules. Thus, the following is valid:</p>
    <p class="code">+x -> +x l</p>
    <br> 
  </v-container>
</template>

<style scoped>
/* css here */
  div.top-scrollbars {
    transform: rotateX(180deg);
  }
  div.top-scrollbars * {
    transform: rotateX(180deg);
  }
  mark{ 
    background-color: #b3aeae;
    font-family:'Courier New', Courier, monospace;
    color:rgb(40, 42, 43)
  }
  .code{ 
    background-color: #b3aeae;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
  }
  a:link{
    color: rgb(131, 193, 235),
  }
  a:visited{
    color:rgb(204, 167, 252),
  }
</style>
