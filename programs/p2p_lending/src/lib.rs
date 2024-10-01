use anchor_lang::prelude::*;

declare_id!("7bFtm6sjKSghBzwgjwtK6d29oVCdoHwB5N6kFSYxcN1r");

#[program]
pub mod p2p_lending {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let lending_account = &mut ctx.accounts.lending_account;
        lending_account.lender = *ctx.accounts.lender.key;
        lending_account.borrower = *ctx.accounts.borrower.key;
        lending_account.amount = 0;
        Ok(())
    }

    pub fn lend(ctx: Context<Lend>, amount: u64) -> Result<()> {
        let lending_account = &mut ctx.accounts.lending_account;
        lending_account.amount += amount;
        Ok(())
    }

    pub fn repay(ctx: Context<Repay>, amount: u64) -> Result<()> {
        let lending_account = &mut ctx.accounts.lending_account;
        lending_account.amount -= amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = lender, space = 8 + 32 + 32 + 8)]
    pub lending_account: Account<'info, LendingAccount>,
    #[account(mut)]
    pub lender: Signer<'info>,
    #[account(mut)]
    pub borrower: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Lend<'info> {
    #[account(mut)]
    pub lending_account: Account<'info, LendingAccount>,
    #[account(mut)]
    pub lender: Signer<'info>,
}

#[derive(Accounts)]
pub struct Repay<'info> {
    #[account(mut)]
    pub lending_account: Account<'info, LendingAccount>,
    #[account(mut)]
    pub borrower: Signer<'info>,
}

#[account]
pub struct LendingAccount {
    pub lender: Pubkey,
    pub borrower: Pubkey,
    pub amount: u64,
}
