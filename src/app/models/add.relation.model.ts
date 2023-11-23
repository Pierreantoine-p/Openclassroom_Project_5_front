export class UserRelation  {
  userFkIdOwnerRelation!: number | null;
  user!: {
    userId: number | null;
  };

  constructor() {
    this.user = { userId: null };
  }
}
