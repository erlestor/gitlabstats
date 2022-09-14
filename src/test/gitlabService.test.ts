import { getAllMembers, getCommits } from "../services/gitlabService";

describe("Gitlab service", () => {
  it("should be able to get all users in repo", async () => {
    const id = 17450;
    const result = await getAllMembers(id);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should be able to get all commits in repo", async () => {
    const id = 17450;
    const result = await getCommits(id);
    expect(result.length).toBeGreaterThan(0);
});
});
