use anchor_lang::prelude::*;


declare_id!("FfpFvZt8RBg57TTMSe36saHKLTngeJzKLcc9dMDrgR8t");


#[program]
pub mod contract_sol_tweet {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        // Get a reference to the account
        let base_account = &mut ctx.accounts.base_account;
        // Initialize total_posts
        base_account.total_posts = 0;
        Ok(())
    }
    
    // incemenent total_post counter
    pub fn add_post(ctx: Context<AddPost>, post_description: String) -> ProgramResult {
        // get ref to the account and increment the counter
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;
        
        let post_len =  post_description.to_string().chars().count();
        // make shure that the post description is not empty
        require!(post_len > 0, CustomError::NoDescription); 
        // make shure that the post description is max 150 char
        require!(post_len < 151, CustomError::PostToLong); 
                
        // Build the struct
        let post = PostStruct {
            post_description: post_description.to_string(),
            user_address: *user.to_account_info().key,
            liked_by: Vec::new(),
        };
        
        // add post to post_list vector and increment the counter
        base_account.post_list.push(post);
        base_account.total_posts += 1;
        Ok(())
    }

    pub fn like_post(ctx: Context<LikePost>, post_description: String, post_author: String) -> ProgramResult {
        // account of the contract
        let base_account = &mut ctx.accounts.base_account;
        // current user
        let user = &mut ctx.accounts.user;

        for post in &mut base_account.post_list {
            // post.liked_by.push(*user.to_account_info().key);
            // find correct post
            if post.post_description == post_description  && post.user_address.to_string() == post_author{
                // check if user has allready liked the post
                let filter:Vec<&Pubkey> = post.liked_by
                                                .iter()
                                                .filter(|address| address.to_string() == user.key().to_string() )
                                                .collect();
                // check if filter value excist
                require!(filter.len() == 0,  CustomError::TwoLikeError);
                
                post.liked_by.push(*user.to_account_info().key);
                
            }
        }
        
        Ok(())
    }

    // function to tip the author of a post
    pub fn tip_author(ctx: Context<TipAuthor>, amount: String) -> ProgramResult{
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

}


// An enum for custom error codes
#[error]
pub enum CustomError {
    #[msg("NoDescription Error message")]
    NoDescription = 123,
    #[msg("PostToLong Error message")]
    PostToLong = 456,
    #[msg("Post allready liked")]
    TwoLikeError = 789,
}

// Like Post
#[derive(Accounts)]
pub struct LikePost<'info>{
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct TipAuthor<'info>{
  #[account(mut)]
  from: Signer<'info>,
  #[account(mut)]
  to: AccountInfo<'info>, 
  system_program: Program<'info,System>  
}

// Start Program
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

// Add Post
#[derive(Accounts)]
pub struct AddPost<'info>{
    #[account(mut)]
    pub base_account: Account<'info,BaseAccount>,
    // signer -> account that calls the function -> in this case the person the makes the post
    #[account(mut)]
    pub user: Signer<'info>,
} 


// struct for the post
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct PostStruct {
    pub post_description: String,
    pub user_address: Pubkey,
    pub liked_by: Vec<Pubkey>
} 

// Base struct of the program
#[account]
pub struct BaseAccount {
    pub total_posts: u64,
    pub post_list: Vec<PostStruct>
}