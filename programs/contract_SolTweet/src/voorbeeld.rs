use anchor_lang::prelude::*;

declare_id!("GQYX5FugE2PJtb9vjQScDu5n1RJLQQz1pSdY2Kp1xfaV");


#[program]
pub mod myepicproject {
  use super::*;
  pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
    let base_account = &mut ctx.accounts.base_account;
    base_account.total_gifs = 0;
    Ok(())
  }

  // The function now accepts a gif_link param from the user. We also reference the user from the Context
  pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
    let base_account = &mut ctx.accounts.base_account;
    let user = &mut ctx.accounts.user;

	// Build the struct.
    let item = ItemStruct {
      gif_link: gif_link.to_string(),
      user_address: *user.to_account_info().key,
      gif_votes: 0,
    };


	// Add it to the gif_list vector.
    base_account.gif_list.push(item);
    base_account.total_gifs += 1;
    Ok(())
  }

  pub fn update_item(ctx: Context<UpdateItem>, gif_link: String, gif_uploader: String) -> ProgramResult {
    let base_account = &mut ctx.accounts.base_account;

    for gif in &mut base_account.gif_list {
        if gif.gif_link == gif_link && gif.user_address.to_string() == gif_uploader {
            gif.gif_votes += 1;
        }
    }
    Ok(())
  }

  pub fn send_sol(ctx: Context<SendSol>, amount: String) -> ProgramResult{
    let amount_as_num: u64 = amount.parse().unwrap();
    let ix = anchor_lang::solana_program::system_instruction::transfer(
      &ctx.accounts.from.key(), 
      &ctx.accounts.to.key(), 
      amount_as_num,);
    anchor_lang::solana_program::program::invoke(
      &ix, 
      &[
        ctx.accounts.from.to_account_info(),
        ctx.accounts.to.to_account_info()
      ],
    )
  }



//   pub fn send_sol(ctx: Context<SendSol>, amount: String) -> ProgramResult {
//     let amount_as_num: u64 = amount.parse().unwrap();
//     let ix = anchor_lang::solana_program::system_instruction::transfer(
//         &ctx.accounts.from.key(),
//         &ctx.accounts.to.key(),
//         amount_as_num
//     );
//     anchor_lang::solana_program::program::invoke(
//         &ix,
//         &[
//             ctx.accounts.from.to_account_info(),
//             ctx.accounts.to.to_account_info()
//         ]
//     );
//     Ok(())
// }
}

#[derive(Accounts)]
pub struct SendSol<'info>{
  #[account(mut)]
  from: Signer<'info>,
  #[account(mut)]
  to: AccountInfo<'info>, 
  system_program: Program<'info,System>  
}




#[derive(Accounts)]
pub struct UpdateItem<'info>{
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
}


#[derive(Accounts)]
pub struct StartStuffOff<'info> {
  #[account(init, payer = user, space = 9000)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program <'info, System>,
}

// Add the signer who calls the AddGif method to the struct so that we can save it
#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
    pub gif_votes: u64,
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
	// Attach a Vector of type ItemStruct to the account.
    pub gif_list: Vec<ItemStruct>,
}