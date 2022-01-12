import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { assert, expect } from 'chai';
import { ContractSolTweet } from '../target/types/contract_sol_tweet';

const { SystemProgram } = anchor.web3;

describe('contract_SolTweet', () => {
  console.log("🚀 Starting test...")

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ContractSolTweet as Program<ContractSolTweet>;

  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log("Your transaction signature", tx);
  });

  it('Fetches data from the account',async () => {
    // Fetch data from the account.
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 Post Count', account.totalPosts.toString())    
  })

  it('adds Posts', async () => {
  // call add_post
     await program.rpc.addPost("This is a test post", {
      accounts:{
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      }
    })

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 Post Count', account.totalPosts.toString())
    // display the post list
    console.log('Post list', account.postList)

    // new post has 0 likes
    assert.equal(account.postList[0].likedBy.length,0)
  })


  it('likes a post', async () => {
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    let post = account.postList[0]
    
    await program.rpc.likePost(post.postDescription, post.userAddress.toString(), {
      accounts:{
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      }
    })
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    post = account.postList[0]
    assert.equal(post.likedBy.length,1)


  })
  it('Emits a TwoLikeError error', async () => {
    try {
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    let post = account.postList[0]
    
    await program.rpc.likePost(post.postDescription, post.userAddress.toString(), {
      accounts:{
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      }
    })
  }catch(err){
    const errMsg = "Post allready liked";
    assert.equal(err.toString(), errMsg);
    assert.equal(err.msg, errMsg);
    assert.equal(err.code, 6000 + 789);
  }

  })


  it("Emits a NoDescription error", async () => {
    try {
      await program.rpc.addPost("", {
        accounts:{
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        }
      })
      assert.ok(false);
    } catch (err) {
      const errMsg = "NoDescription Error message";
      assert.equal(err.toString(), errMsg);
      assert.equal(err.msg, errMsg);
      assert.equal(err.code, 6000 + 123);
    }
  });
  it("Emits a PostToLong error", async () => {
    try {
      await program.rpc.addPost("9GFcNATBro2dDxLuTW0WZUHVcxai77FGfaby3p5OnDVK0QGbGpGKhmekXPdReEXrQJlShw9OMkwuzSo054vkvoXEZS7PfOBhSv6rEKJ3DeJaGP83tarwSI7WdEgZkIHE1Y81Nq6rMmplRxxJRBhfuU3", {
        accounts:{
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        }
      })
      assert.ok(false);
    } catch (err) {
      const errMsg = "PostToLong Error message";
      assert.equal(err.toString(), errMsg);
      assert.equal(err.msg, errMsg);
      assert.equal(err.code, 6000 + 456);
    }
  });

    
});
