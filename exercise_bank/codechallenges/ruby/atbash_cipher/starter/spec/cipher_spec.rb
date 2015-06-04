require 'spec_helper'
require_relative '../lib/cipher'

describe Cipher do

  describe "::encode" do
    it "encodes the word 'hello'" do
      expect( Cipher.encode( "hello") ).to eq("svool")
    end

    it "encodes the word 'peter'" do
      expect( Cipher.encode( "peter") ).to eq("kvgvi")
    end
  end
  
end