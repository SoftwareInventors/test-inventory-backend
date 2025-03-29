import bcrypt from 'bcrypt';
export const comparePassword = async (
  GivenPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isPasswordMatched = await bcrypt.compare(GivenPassword, hashedPassword);
  return isPasswordMatched;
};
