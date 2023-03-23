declare module 'monopolygame' {
  export default Monopoly;
}

class Monopoly {
  board: Board;
  teams: Array<Team>;
  currentAction: any;

  constructor(options: { board: Board | any, teams: number; });
  payment(payingTeam: any, targetTeam: any, amount: any);
  action(actionRecord: any, team: any);
  nextActions(actions: any);
}

class Board {
  actions: any;
  map: any;
  pieces: any;
}

class Team {
  game: Monopoly;
  index: number;
  wallet: number;

  move(steps: number): Movement;
  moveTo(target: any);
  buy(field: any, rules: any);
  transaction(targetTeam: Team, amount: number);
  payTax(amount: number);
  earnSalary();
  fields(): any;
  piece(): any;
  name(): string;
}

class Movement {
  success: boolean;
  steps: number;
  team: Team;
  target: any;
  next: any;
}